import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FilterBar from "./components/FilterBar";
import NavigationOverlay from "./components/NavigationOverlay";
import TrackOptionsOverlay from "./components/TrackOptionsOverlay";
import TrackRow from "./components/TrackRow";
import { tracks, versioners } from "./data/tracks";
import {
  PLAYBACK_PROFILES,
  VERSION_PITCH_OFFSETS,
  buildEffectChain as createEffectChain,
  buildPattern,
  createAudioContext,
  playSynthStep,
  tearDownEffectChain as disposeEffectChain
} from "./lib/synth";

function App() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTrack, setMenuTrack] = useState(null);
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const [playingVersionIndex, setPlayingVersionIndex] = useState(0);
  const audioContextRef = useRef(null);
  const playbackIntervalRef = useRef(null);
  const activeNodesRef = useRef(null);
  const stepRef = useRef(0);
  const trackCatalog = tracks;
  const [versionIndexes, setVersionIndexes] = useState(() =>
    Object.fromEntries(tracks.map((track) => [track.id, 0]))
  );
  const trackProfiles = useMemo(
    () =>
      Object.fromEntries(
        tracks.map((track, index) => [track.id, PLAYBACK_PROFILES[index % PLAYBACK_PROFILES.length]])
      ),
    []
  );
  const versionCountByTrack = useMemo(
    () => Object.fromEntries(trackCatalog.map((track) => [track.id, track.versions.length])),
    [trackCatalog]
  );
  const normalizedQuery = query.trim().toLowerCase();

  const filteredTracks = useMemo(() => {
    return trackCatalog.filter((track) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        track.title.toLowerCase().includes(normalizedQuery) ||
        track.artist.toLowerCase().includes(normalizedQuery) ||
        track.creator.toLowerCase().includes(normalizedQuery) ||
        track.versions.some((version) => version.creator.toLowerCase().includes(normalizedQuery));

      return matchesQuery;
    });
  }, [normalizedQuery, trackCatalog]);
  const filteredVersioners = useMemo(() => {
    if (normalizedQuery.length === 0) {
      return versioners;
    }

    return versioners.filter((versioner) => {
      if (versioner.name.toLowerCase().includes(normalizedQuery)) {
        return true;
      }

      return trackCatalog.some((track) => {
        const versionerIsAttached =
          track.creatorId === versioner.id ||
          track.versions.some((version) => version.creatorId === versioner.id);

        if (!versionerIsAttached) {
          return false;
        }

        return (
          track.title.toLowerCase().includes(normalizedQuery) ||
          track.artist.toLowerCase().includes(normalizedQuery)
        );
      });
    });
  }, [normalizedQuery, trackCatalog]);
  const activeTrackId = playingTrackId ?? selectedTrackId;
  const activeVersionerId = useMemo(() => {
    if (!activeTrackId) {
      return null;
    }

    const activeTrack = trackCatalog.find((track) => track.id === activeTrackId);
    if (!activeTrack || activeTrack.versions.length === 0) {
      return null;
    }

    const activeVersionIndex = versionIndexes[activeTrackId] ?? 0;
    const safeVersionIndex =
      ((activeVersionIndex % activeTrack.versions.length) + activeTrack.versions.length) %
      activeTrack.versions.length;

    return activeTrack.versions[safeVersionIndex]?.creatorId ?? null;
  }, [activeTrackId, trackCatalog, versionIndexes]);
  const activeTrackVersioners = useMemo(() => {
    if (!activeTrackId) {
      return null;
    }

    const activeTrack = trackCatalog.find((track) => track.id === activeTrackId);
    if (!activeTrack) {
      return [];
    }

    const versionerIds = new Set([
      activeTrack.creatorId,
      ...activeTrack.versions.map((version) => version.creatorId)
    ]);

    return versioners.filter((versioner) => versionerIds.has(versioner.id));
  }, [activeTrackId, trackCatalog]);
  const visibleVersioners = activeTrackVersioners ?? filteredVersioners;
  const handleTrackMenuOpen = useCallback((track) => {
    setIsMenuOpen(false);
    setMenuTrack(track);
  }, []);
  const handleTrackMenuClose = useCallback(() => {
    setMenuTrack(null);
  }, []);

  const tearDownEffectChain = useCallback(() => {
    disposeEffectChain(activeNodesRef.current);
    activeNodesRef.current = null;
  }, []);

  const buildEffectChain = useCallback(
    (context, profile) => {
      tearDownEffectChain();

      activeNodesRef.current = createEffectChain(context, profile);
    },
    [tearDownEffectChain]
  );

  const stopPlayback = useCallback(() => {
    if (playbackIntervalRef.current) {
      window.clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }

    tearDownEffectChain();
    setPlayingTrackId(null);
    setPlayingVersionIndex(0);
    stepRef.current = 0;
  }, [tearDownEffectChain]);

  const handleVersionSwipe = useCallback(
    (trackId, direction) => {
      setSelectedTrackId(trackId);
      if (playingTrackId && playingTrackId !== trackId) {
        stopPlayback();
      }

      setVersionIndexes((previousState) => {
        const versionCount = versionCountByTrack[trackId] ?? 1;
        const currentIndex = previousState[trackId] ?? 0;
        const delta = direction === "next" ? 1 : -1;
        const nextIndex = (currentIndex + delta + versionCount) % versionCount;

        return {
          ...previousState,
          [trackId]: nextIndex
        };
      });
    },
    [playingTrackId, stopPlayback, versionCountByTrack]
  );

  const playStep = useCallback((context, frequency, profile) => {
    playSynthStep(context, frequency, profile, activeNodesRef.current?.inputGain);
  }, []);

  const handleTrackSelect = useCallback(
    async (track) => {
      const selectedVersionIndex = track.versionIndex ?? 0;
      const isTrackAlreadySelected = selectedTrackId === track.id;

      if (!isTrackAlreadySelected) {
        setSelectedTrackId(track.id);

        if (playingTrackId && playingTrackId !== track.id) {
          stopPlayback();
        }

        return;
      }

      if (playingTrackId === track.id && playingVersionIndex === selectedVersionIndex) {
        stopPlayback();
        return;
      }

      let context = audioContextRef.current;
      if (!context || context.state === "closed") {
        context = createAudioContext();
        audioContextRef.current = context;
      }

      await context.resume();

      if (playbackIntervalRef.current) {
        window.clearInterval(playbackIntervalRef.current);
      }

      const profile = trackProfiles[track.id] ?? PLAYBACK_PROFILES[0];
      buildEffectChain(context, profile);
      const pattern = buildPattern(track.id, profile.scale, selectedVersionIndex);
      const versionPitchOffset =
        VERSION_PITCH_OFFSETS[selectedVersionIndex % VERSION_PITCH_OFFSETS.length] ?? 1;

      stepRef.current = 0;
      setSelectedTrackId(track.id);
      setPlayingTrackId(track.id);
      setPlayingVersionIndex(selectedVersionIndex);
      playStep(context, pattern[0] * versionPitchOffset, profile);
      stepRef.current = 1;

      playbackIntervalRef.current = window.setInterval(() => {
        const nextFrequency = pattern[stepRef.current % pattern.length];
        playStep(context, nextFrequency * versionPitchOffset, profile);
        stepRef.current += 1;
      }, profile.tempoMs);
    },
    [
      buildEffectChain,
      playStep,
      selectedTrackId,
      playingTrackId,
      playingVersionIndex,
      stopPlayback,
      trackProfiles
    ]
  );

  useEffect(() => {
    return () => {
      if (playbackIntervalRef.current) {
        window.clearInterval(playbackIntervalRef.current);
      }
      tearDownEffectChain();
      const context = audioContextRef.current;
      audioContextRef.current = null;
      if (context) {
        context.close();
      }
    };
  }, [tearDownEffectChain]);

  useEffect(() => {
    if (!playingTrackId) {
      return;
    }

    const isTrackVisible = filteredTracks.some((track) => track.id === playingTrackId);
    if (!isTrackVisible) {
      stopPlayback();
    }
  }, [filteredTracks, playingTrackId, stopPlayback]);

  useEffect(() => {
    if (!selectedTrackId) {
      return;
    }

    const isTrackVisible = filteredTracks.some((track) => track.id === selectedTrackId);
    if (!isTrackVisible) {
      setSelectedTrackId(null);
    }
  }, [filteredTracks, selectedTrackId]);

  useEffect(() => {
    if (!playingTrackId) {
      return;
    }

    const activeVersionForPlayingTrack = versionIndexes[playingTrackId] ?? 0;
    if (activeVersionForPlayingTrack !== playingVersionIndex) {
      stopPlayback();
    }
  }, [playingTrackId, playingVersionIndex, stopPlayback, versionIndexes]);

  return (
    <main className="mx-auto flex h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-base-100 text-[#1d1f24]">
      <section className="relative flex h-full flex-col">
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          onMenuClick={() => {
            setMenuTrack(null);
            setIsMenuOpen(true);
          }}
          activeVersionerId={activeVersionerId}
          versioners={visibleVersioners}
        />

        <div className="track-scrollbar flex-1 overflow-y-auto px-2 py-2">
          {filteredTracks.length > 0 ? (
            <ul className="space-y-1">
              {filteredTracks.map((track) => (
                <li key={track.id}>
                  {(() => {
                    const versionCount = track.versions.length;
                    const currentVersionIndex = versionIndexes[track.id] ?? 0;
                    const safeVersionIndex =
                      ((currentVersionIndex % versionCount) + versionCount) % versionCount;
                    const activeVersion = track.versions[safeVersionIndex];
                    const displayTrack = {
                      ...track,
                      mixTitle: activeVersion.title,
                      title: track.title,
                      artist: activeVersion.artist,
                      creator: activeVersion.creator,
                      creatorAvatar: activeVersion.creatorAvatar,
                      versionIndex: safeVersionIndex
                    };

                    return (
                      <TrackRow
                        track={displayTrack}
                        isSelected={selectedTrackId === track.id}
                        isPlaying={playingTrackId === track.id}
                        profile={trackProfiles[track.id]}
                        onSelect={handleTrackSelect}
                        onVersionSwipe={handleVersionSwipe}
                        onOpenMenu={handleTrackMenuOpen}
                      />
                    );
                  })()}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center">
              <div>
                <p className="text-base font-semibold text-base-content/80">No tracks found</p>
                <p className="mt-1 text-sm text-base-content/60">
                  Try a different track or artist search term.
                </p>
              </div>
            </div>
          )}
        </div>

        <NavigationOverlay open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <TrackOptionsOverlay
          open={Boolean(menuTrack)}
          track={menuTrack}
          onClose={handleTrackMenuClose}
        />
      </section>
    </main>
  );
}

export default App;
