export const versioners = [
  {
    id: "jp",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    name: "JP"
  },
  {
    id: "alex-m",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&q=80",
    name: "Alex M."
  },
  {
    id: "rico-t",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=120&q=80",
    name: "Rico T."
  },
  {
    id: "sam-n",
    avatar:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=120&q=80",
    name: "Sam N."
  },
  {
    id: "ivy-m",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    name: "Ivy M."
  },
  {
    id: "luca-p",
    avatar:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=120&q=80",
    name: "Luca P."
  },
  {
    id: "ari-c",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    name: "Ari C."
  },
  {
    id: "seth-v",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
    name: "Seth V."
  },
  {
    id: "nia-k",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    name: "Nia K."
  },
  {
    id: "tom-g",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=120&q=80",
    name: "Tom G."
  },
  {
    id: "yasmin-d",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    name: "Yasmin D."
  },
  {
    id: "jules-b",
    avatar:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=120&q=80",
    name: "Jules B."
  }
];

export const versionersById = Object.fromEntries(
  versioners.map((versioner) => [versioner.id, versioner])
);

const trackDefinitions = [
  {
    id: "trk_1",
    title: "Soft Edges Hard Floors",
    artist: "Lena Vale",
    genre: "Synth Pop",
    duration: "3:32",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=240&q=80",
    creatorId: "jp",
    versions: [
      {
        creatorId: "jp",
        title: "JP rerub"
      },
      {
        creatorId: "alex-m",
        title: null
      },
      {
        creatorId: "rico-t",
        title: "Unplugged"
      },
      {
        creatorId: "sam-n",
        title: "Night Remix"
      }
    ]
  },
  {
    id: "trk_2",
    title: "Things I Don't Say",
    artist: "Midnight Harbor",
    genre: "Electronic",
    duration: "4:04",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=240&q=80",
    creatorId: "jp",
    versions: [
      {
        creatorId: "jp",
        title: "Analogz"
      },
      {
        creatorId: "alex-m",
        title: null
      },
      {
        creatorId: "rico-t",
        title: "Unplugged"
      },
      {
        creatorId: "sam-n",
        title: "Night Remix"
      }
    ]
  },
  {
    id: "trk_3",
    title: "Never Been a Cheater",
    artist: "Arlo K",
    genre: "Indie",
    duration: "2:58",
    thumbnail:
      "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=240&q=80",
    creatorId: "jp",
    versions: [
      {
        creatorId: "jp",
        title: "Sweaty Box"
      },
      {
        creatorId: "alex-m",
        title: null
      },
      {
        creatorId: "rico-t",
        title: "Unplugged"
      },
      {
        creatorId: "sam-n",
        title: "Night Remix"
      }
    ]
  },
  {
    id: "trk_4",
    title: "Whisper",
    artist: "Sia Nova",
    genre: "House",
    duration: "3:47",
    thumbnail:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=240&q=80",
    creatorId: "jp",
    versions: [
      {
        creatorId: "jp",
        title: "Directors Cut"
      },
      {
        creatorId: "alex-m",
        title: null
      },
      {
        creatorId: "rico-t",
        title: "Unplugged"
      },
      {
        creatorId: "sam-n",
        title: "Night Remix"
      }
    ]
  },
  {
    id: "trk_5",
    title: "Tes Doigts Sur Ma Peau",
    artist: "Cass Atlas",
    genre: "Chill",
    duration: "3:11",
    thumbnail:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=240&q=80",
    creatorId: "ivy-m",
    versions: [
      {
        creatorId: "ivy-m",
        title: null
      },
      {
        creatorId: "luca-p",
        title: "Unplugged"
      },
      {
        creatorId: "ari-c",
        title: "Skyline Remix"
      },
      {
        creatorId: "seth-v",
        title: "Tape Session"
      }
    ]
  },
  {
    id: "trk_6",
    title: "Smells Like Money",
    artist: "The Bloomers",
    genre: "Acoustic",
    duration: "4:19",
    thumbnail:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=240&q=80",
    creatorId: "luca-p",
    versions: [
      {
        creatorId: "luca-p",
        title: null
      },
      {
        creatorId: "ari-c",
        title: "Loft Session"
      },
      {
        creatorId: "seth-v",
        title: "Night Remix"
      },
      {
        creatorId: "nia-k",
        title: "Acoustic Pass"
      }
    ]
  },
  {
    id: "trk_7",
    title: "Nuit Electrique",
    artist: "Echo Lake",
    genre: "Electronic",
    duration: "3:40",
    thumbnail:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=240&q=80",
    creatorId: "ari-c",
    versions: [
      {
        creatorId: "ari-c",
        title: null
      },
      {
        creatorId: "seth-v",
        title: "Unplugged"
      },
      {
        creatorId: "nia-k",
        title: "Rooftop Remix"
      },
      {
        creatorId: "tom-g",
        title: "Radio Edit"
      }
    ]
  },
  {
    id: "trk_8",
    title: "MoFire",
    artist: "Nora Isles",
    genre: "Indie",
    duration: "2:49",
    thumbnail: "https://picsum.photos/id/1039/240/240",
    creatorId: "seth-v",
    versions: [
      {
        creatorId: "seth-v",
        title: null
      },
      {
        creatorId: "nia-k",
        title: "Studio Dub"
      },
      {
        creatorId: "tom-g",
        title: "Moonlight Remix"
      },
      {
        creatorId: "yasmin-d",
        title: "Acoustic Tape"
      }
    ]
  },
  {
    id: "trk_9",
    title: "Electric Moves",
    artist: "Orbit 84",
    genre: "Synth Pop",
    duration: "3:06",
    thumbnail:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=240&q=80",
    creatorId: "nia-k",
    versions: [
      {
        creatorId: "nia-k",
        title: null
      },
      {
        creatorId: "tom-g",
        title: "Unplugged"
      },
      {
        creatorId: "yasmin-d",
        title: "Night Shift Remix"
      },
      {
        creatorId: "jules-b",
        title: "Radio Edit"
      }
    ]
  },
  {
    id: "trk_10",
    title: "Phoenix Rising",
    artist: "Rhea & Co.",
    genre: "House",
    duration: "4:25",
    thumbnail:
      "https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&fit=crop&w=240&q=80",
    creatorId: "tom-g",
    versions: [
      {
        creatorId: "tom-g",
        title: null
      },
      {
        creatorId: "yasmin-d",
        title: "Club Remix"
      },
      {
        creatorId: "jules-b",
        title: "Afterhours"
      },
      {
        creatorId: "jp",
        title: "Unplugged"
      }
    ]
  },
  {
    id: "trk_11",
    title: "Do Your Worse",
    artist: "Oriel",
    genre: "Chill",
    duration: "3:14",
    thumbnail:
      "https://images.unsplash.com/photo-1444824775686-4185f172c44b?auto=format&fit=crop&w=240&q=80",
    creatorId: "yasmin-d",
    versions: [
      {
        creatorId: "yasmin-d",
        title: null
      },
      {
        creatorId: "jules-b",
        title: "Unplugged"
      },
      {
        creatorId: "jp",
        title: "Morning Remix"
      },
      {
        creatorId: "alex-m",
        title: "Radio Edit"
      }
    ]
  },
  {
    id: "trk_12",
    title: "Out Of The Shadows",
    artist: "Twelve Pines",
    genre: "Acoustic",
    duration: "3:57",
    thumbnail:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=240&q=80",
    creatorId: "jules-b",
    versions: [
      {
        creatorId: "jules-b",
        title: null
      },
      {
        creatorId: "jp",
        title: "Campfire Edit"
      },
      {
        creatorId: "alex-m",
        title: "Night Remix"
      },
      {
        creatorId: "rico-t",
        title: "Radio Edit"
      }
    ]
  }
];

function getVersioner(versionerId) {
  const versioner = versionersById[versionerId];

  if (!versioner) {
    throw new Error(`Unknown versioner: ${versionerId}`);
  }

  return versioner;
}

export const tracks = trackDefinitions.map((track) => {
  const creator = getVersioner(track.creatorId);

  return {
    ...track,
    creator: creator.name,
    creatorAvatar: creator.avatar,
    versions: track.versions.map((version) => {
      const versioner = getVersioner(version.creatorId);

      return {
        ...version,
        artist: version.artist ?? track.artist,
        creator: versioner.name,
        creatorAvatar: versioner.avatar
      };
    })
  };
});
