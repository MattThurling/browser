import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, Ellipsis, X } from "lucide-react";
import NavigationOverlay from "../components/NavigationOverlay";
import { tracks } from "../data/tracks";
import { navigate } from "../lib/navigation";

function SearchLabScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSearchType, setActiveSearchType] = useState(null);
  const [versionerQuery, setVersionerQuery] = useState("");
  const [artistQuery, setArtistQuery] = useState("");
  const versionerScrollRef = useRef(null);

  const allVersions = useMemo(
    () =>
      tracks.flatMap((track) =>
        track.versions.map((version, index) => ({
          id: `${track.id}-v${index + 1}`,
          baseTrackId: track.id,
          title: version.title,
          artist: version.artist,
          creator: version.creator,
          creatorAvatar: version.creatorAvatar,
          thumbnail: track.thumbnail
        }))
      ),
    []
  );

  const versionerFilteredVersions = useMemo(() => {
    if (activeSearchType !== "versioner") {
      return allVersions;
    }

    const normalizedVersioner = versionerQuery.trim().toLowerCase();
    if (normalizedVersioner.length === 0) {
      return allVersions;
    }

    return allVersions.filter((version) =>
      version.creator.toLowerCase().includes(normalizedVersioner)
    );
  }, [activeSearchType, allVersions, versionerQuery]);

  const artistFilteredVersions = useMemo(() => {
    if (activeSearchType !== "artist") {
      return allVersions;
    }

    const normalizedArtist = artistQuery.trim().toLowerCase();
    if (normalizedArtist.length === 0) {
      return allVersions;
    }

    return allVersions.filter((version) => version.artist.toLowerCase().includes(normalizedArtist));
  }, [activeSearchType, allVersions, artistQuery]);

  const displayedVersions =
    activeSearchType === "versioner"
      ? versionerFilteredVersions
      : activeSearchType === "artist"
        ? artistFilteredVersions
        : allVersions;

  const versionerSourceVersions =
    activeSearchType === "versioner"
      ? versionerFilteredVersions
      : activeSearchType === "artist"
        ? artistFilteredVersions
        : allVersions;

  const versionerList = useMemo(() => {
    return versionerSourceVersions.map((version) => ({
      id: version.id,
      name: version.creator,
      avatar: version.creatorAvatar,
      versionTitle: version.title
    }));
  }, [versionerSourceVersions]);

  const [selectedVersionId, setSelectedVersionId] = useState(() => allVersions[0]?.id ?? null);

  useEffect(() => {
    if (displayedVersions.length === 0) {
      setSelectedVersionId(null);
      return;
    }

    if (!selectedVersionId) {
      if (activeSearchType === null) {
        setSelectedVersionId(displayedVersions[0].id);
      }
      return;
    }

    const isSelectionStillVisible = displayedVersions.some(
      (version) => version.id === selectedVersionId
    );

    if (!isSelectionStillVisible) {
      if (activeSearchType === null) {
        setSelectedVersionId(displayedVersions[0].id);
        return;
      }

      setSelectedVersionId(null);
    }
  }, [activeSearchType, displayedVersions, selectedVersionId]);

  useEffect(() => {
    const container = versionerScrollRef.current;
    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [versionerList.length]);

  const activeVersion =
    selectedVersionId
      ? displayedVersions.find((version) => version.id === selectedVersionId) ?? null
      : null;
  const versionerSearchAvatar = activeVersion?.creatorAvatar ?? versionerList[0]?.avatar ?? null;
  const artistSearchThumbnail =
    activeVersion?.thumbnail ?? displayedVersions[0]?.thumbnail ?? allVersions[0]?.thumbnail ?? null;

  const activeSearchValue =
    activeSearchType === "versioner"
      ? versionerQuery
      : activeSearchType === "artist"
        ? artistQuery
        : "";

  const handleActiveSearchChange = (nextValue) => {
    if (activeSearchType === "versioner") {
      setVersionerQuery(nextValue);
      return;
    }

    if (activeSearchType === "artist") {
      setArtistQuery(nextValue);
    }
  };

  const clearActiveSearch = () => {
    if (activeSearchType === "versioner") {
      setVersionerQuery("");
      return;
    }

    if (activeSearchType === "artist") {
      setArtistQuery("");
    }
  };

  const toggleSearchType = (searchType) => {
    setActiveSearchType((previousType) => {
      if (previousType === searchType) {
        return null;
      }

      if (searchType === "artist") {
        setVersionerQuery("");
      } else {
        setArtistQuery("");
      }

      return searchType;
    });
  };

  const handleVersionSelect = (versionId) => {
    setSelectedVersionId(versionId);
    setActiveSearchType(null);
    setVersionerQuery("");
    setArtistQuery("");
  };

  const showOptionLists = activeSearchType !== null;

  return (
    <main className="mx-auto flex h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-white text-[#1d1f24]">
      <header className="px-5 pb-2 pt-4">
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-[#2f3339]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          <button
            type="button"
            aria-label="Open navigation"
            className="text-[#2f3339]"
            onClick={() => setIsMenuOpen(true)}
          >
            <Ellipsis className="h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="min-h-0 flex-1 px-5 pb-5">
        <div className="grid h-full min-h-0 grid-rows-[1fr_auto_1fr] gap-4 pt-4">
          <div
            ref={versionerScrollRef}
            dir="rtl"
            className="min-h-0 overflow-y-auto pl-2 [scrollbar-gutter:stable]"
          >
            {showOptionLists ? (
              <div dir="ltr" className="flex min-h-full flex-col justify-end gap-3">
                {versionerList.map((versioner) => (
                  <button
                    key={versioner.id}
                    type="button"
                    onClick={() => handleVersionSelect(versioner.id)}
                    className={`grid w-full grid-cols-[1fr_36px] items-center gap-2 rounded-md py-0.5 text-left ${
                      selectedVersionId === versioner.id ? "bg-[#f3f3f3]" : ""
                    }`}
                    aria-label={`Select ${versioner.name}`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold leading-none text-[#1d1f24]">
                        {versioner.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-none text-[#4a4a4a]">
                        {versioner.versionTitle}
                      </p>
                    </div>
                    <div className="avatar justify-self-end">
                      <div className="w-9 overflow-hidden rounded-full">
                        <img src={versioner.avatar} alt={versioner.name} className="object-cover" />
                      </div>
                    </div>
                  </button>
                ))}

                {versionerList.length === 0 ? (
                  <p className="text-xs text-[#8a8a8a]">No versioners match this search.</p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="border-y border-[#bfbfbf] py-4">
            <div className="grid w-full grid-cols-[56px_1fr_36px] items-center gap-3">
              <button
                type="button"
                onClick={() => toggleSearchType("artist")}
                className={`h-14 w-14 overflow-hidden border rounded-lg ${
                  activeSearchType === "artist" ? "border-[#1d1f24]" : "border-[#cfcfcf]"
                }`}
                aria-label="Search by artist"
              >
                {artistSearchThumbnail ? (
                  <img
                    src={artistSearchThumbnail}
                    alt="Artist search cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="block h-full w-full bg-[#d2d2d2]" />
                )}
              </button>

              <div className="min-w-0">
                {activeSearchType ? (
                  <label
                    className={`flex h-8 items-center gap-2 border border-[#bfbfbf] bg-white ${
                      activeSearchType === "artist"
                        ? "mr-auto w-[92%] rounded-none px-2"
                        : "ml-auto w-[92%] rounded-full px-3"
                    }`}
                  >
                    <input
                      value={activeSearchValue}
                      onChange={(event) => handleActiveSearchChange(event.target.value)}
                      placeholder={
                        activeSearchType === "versioner"
                          ? "Search by versioner"
                          : "Search by artist"
                      }
                      className="w-full bg-transparent text-sm leading-none outline-none placeholder:text-[#a0a0a0]"
                    />
                    {activeSearchValue ? (
                      <button
                        type="button"
                        onClick={clearActiveSearch}
                        className="text-[#9a9a9a]"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </label>
                ) : activeVersion ? (
                  <button
                    type="button"
                    onClick={() => handleVersionSelect(activeVersion.id)}
                    className="w-full text-left"
                  >
                    <p className="truncate text-sm font-semibold leading-none">{activeVersion.title}</p>
                    <p className="mt-1 truncate text-xs leading-none text-[#4a4a4a]">
                      {activeVersion.artist}
                    </p>
                  </button>
                ) : (
                  <p className="text-xs text-[#8a8a8a]">
                    {displayedVersions.length > 0 ? "Select a version" : "No matching versions yet."}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => toggleSearchType("versioner")}
                className={`avatar h-9 w-9 overflow-hidden rounded-full border ${
                  activeSearchType === "versioner"
                    ? "border-[#1d1f24]"
                    : "border-[#cfcfcf]"
                }`}
                aria-label="Search by versioner"
              >
                {versionerSearchAvatar ? (
                  <img
                    src={versionerSearchAvatar}
                    alt="Versioner search avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="block h-full w-full bg-[#d2d2d2]" />
                )}
              </button>
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto pt-1">
            {showOptionLists ? (
              <div className="space-y-4 pb-3">
                {displayedVersions.map((version) => (
                  <button
                    key={version.id}
                    type="button"
                    onClick={() => handleVersionSelect(version.id)}
                    className="grid w-full grid-cols-[56px_1fr] items-center gap-3 rounded-sm text-left"
                    aria-label={`${version.title} by ${version.artist}`}
                  >
                    <img
                      src={version.thumbnail}
                      alt={version.title}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold leading-none">{version.title}</p>
                      <p className="mt-1 truncate text-xs leading-none text-[#4a4a4a]">
                        {version.artist}
                      </p>
                    </div>
                  </button>
                ))}

                {displayedVersions.length === 0 ? (
                  <p className="text-xs text-[#8a8a8a]">No tracks match this search.</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <NavigationOverlay open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}

export default SearchLabScreen;
