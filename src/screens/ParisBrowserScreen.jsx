import { useMemo, useState } from "react";
import { tracks } from "../data/tracks";

function getMixName(trackTitle, versionTitle) {
  if (versionTitle === trackTitle) {
    return "Original";
  }

  const titlePrefix = `${trackTitle} - `;
  if (versionTitle.startsWith(titlePrefix)) {
    return versionTitle.slice(titlePrefix.length);
  }

  return versionTitle;
}

function ParisBrowserScreen() {
  const [query, setQuery] = useState("");
  const [activeVersioner, setActiveVersioner] = useState(null);

  const originalRows = useMemo(
    () =>
      tracks.map((track) => {
        const originalVersion =
          track.versions.find((version) => version.title === track.title) ?? track.versions[0];

        return {
          id: track.id,
          trackTitle: track.title,
          mixName: getMixName(track.title, originalVersion.title),
          artist: originalVersion.artist,
          versioner: originalVersion.creator,
          versionerAvatar: originalVersion.creatorAvatar,
          thumbnail: track.thumbnail
        };
      }),
    []
  );

  const versioners = useMemo(() => {
    const uniqueVersioners = new Map();

    originalRows.forEach((row) => {
      if (!uniqueVersioners.has(row.versioner)) {
        uniqueVersioners.set(row.versioner, {
          name: row.versioner,
          avatar: row.versionerAvatar
        });
      }
    });

    return Array.from(uniqueVersioners.values());
  }, [originalRows]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return originalRows.filter((row) => {
      const matchesVersioner = !activeVersioner || row.versioner === activeVersioner;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        row.trackTitle.toLowerCase().includes(normalizedQuery) ||
        row.mixName.toLowerCase().includes(normalizedQuery) ||
        row.artist.toLowerCase().includes(normalizedQuery) ||
        row.versioner.toLowerCase().includes(normalizedQuery);

      return matchesVersioner && matchesQuery;
    });
  }, [activeVersioner, query, originalRows]);

  return (
    <main className="mx-auto flex h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-white px-4 pb-6 pt-6 text-[#12141a]">
      <div className="rounded-3xl border border-[#23252a] px-4 py-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="w-full bg-transparent text-sm outline-none placeholder:text-[#8f8f8f]"
        />
      </div>

      <section className="mt-6">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {versioners.map((versioner) => (
            <button
              key={versioner.name}
              type="button"
              onClick={() =>
                setActiveVersioner((previousValue) =>
                  previousValue === versioner.name ? null : versioner.name
                )
              }
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-full ${
                activeVersioner === versioner.name ? "ring-2 ring-[#1d1f24]" : ""
              }`}
              aria-label={`Filter by ${versioner.name}`}
            >
              <img
                src={versioner.avatar}
                alt={versioner.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 min-h-0 flex-1 overflow-y-auto">
        <div className="space-y-3 pb-3">
          {filteredRows.map((row) => (
            <article key={row.id} className="grid grid-cols-[64px_64px_1fr] items-center gap-3">
              <img
                src={row.versionerAvatar}
                alt={row.versioner}
                className="h-16 w-16 rounded-full object-cover"
                loading="lazy"
              />
              <img
                src={row.thumbnail}
                alt={`${row.trackTitle} artwork`}
                className="h-16 w-16 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-tight text-[#11131a]">
                  {row.trackTitle} * {row.mixName}
                </p>
                <p className="truncate text-xs leading-tight text-[#11131a]">
                  {row.artist} • {row.versioner}
                </p>
              </div>
            </article>
          ))}

          {filteredRows.length === 0 ? (
            <p className="text-sm text-[#8f8f8f]">No versions match this filter.</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default ParisBrowserScreen;
