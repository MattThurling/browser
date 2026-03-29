const artistCreators = [
  {
    id: "lena-vale",
    avatar: "https://i.pravatar.cc/120?img=11",
    name: "Lena Vale"
  },
  {
    id: "midnight-harbor",
    avatar: "https://i.pravatar.cc/120?img=12",
    name: "Midnight Harbor"
  },
  {
    id: "arlo-k",
    avatar: "https://i.pravatar.cc/120?img=13",
    name: "Arlo K"
  },
  {
    id: "sia-nova",
    avatar: "https://i.pravatar.cc/120?img=14",
    name: "Sia Nova"
  },
  {
    id: "cass-atlas",
    avatar: "https://i.pravatar.cc/120?img=15",
    name: "Cass Atlas"
  },
  {
    id: "antonio-artist",
    avatar: "https://i.pravatar.cc/120?img=16",
    name: "Antonio"
  },
  {
    id: "nora-isles",
    avatar: "https://i.pravatar.cc/120?img=17",
    name: "Nora Isles"
  },
  {
    id: "orbit-84",
    avatar: "https://i.pravatar.cc/120?img=18",
    name: "Orbit 84"
  },
  {
    id: "rhea-co",
    avatar: "https://i.pravatar.cc/120?img=19",
    name: "Rhea & Co."
  },
  {
    id: "oriel-artist",
    avatar: "https://i.pravatar.cc/120?img=20",
    name: "Oriel"
  },
  {
    id: "twelve-pines",
    avatar: "https://i.pravatar.cc/120?img=21",
    name: "Twelve Pines"
  }
];

const mixVersioners = [
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
    id: "dave",
    avatar:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=120&q=80",
    name: "Dave"
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

export const versioners = [...artistCreators, ...mixVersioners];

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
    creatorId: "lena-vale",
    versions: [
      {
        creatorId: "lena-vale",
        title: null
      },
      {
        creatorId: "jp",
        title: "JP rerub"
      },
      {
        creatorId: "rico-t",
        title: "Unplugged"
      },
      {
        creatorId: "dave",
        title: "Night Remix"
      },
      {
        creatorId: "ivy-m",
        title: "Tape Echo Mix"
      },
      {
        creatorId: "luca-p",
        title: "Basement Dub"
      },
      {
        creatorId: "ari-c",
        title: "Sunrise Rework"
      },
      {
        creatorId: "seth-v",
        title: "Instrumental Cut"
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
    creatorId: "midnight-harbor",
    versions: [
      {
        creatorId: "midnight-harbor",
        title: null
      },
      {
        creatorId: "jp",
        title: "Analogz"
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
    creatorId: "arlo-k",
    versions: [
      {
        creatorId: "arlo-k",
        title: null
      },
      {
        creatorId: "jp",
        title: "Sweaty Box"
      },
      {
        creatorId: "rico-t",
        title: "Unplugged"
      },
      {
        creatorId: "dave",
        title: "Night Remix"
      },
      {
        creatorId: "nia-k",
        title: "Afterglow Pass"
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
    creatorId: "sia-nova",
    versions: [
      {
        creatorId: "sia-nova",
        title: null
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
    creatorId: "cass-atlas",
    versions: [
      {
        creatorId: "cass-atlas",
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
      },
      {
        creatorId: "yasmin-d",
        title: "Afterhours Edit"
      },
      {
        creatorId: "jules-b",
        title: "Late Train Mix"
      }
    ]
  },
  {
    id: "trk_6",
    title: "Smells Like Money",
    artist: "Antonio",
    genre: "Acoustic",
    duration: "4:19",
    thumbnail:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=240&q=80",
    creatorId: "antonio-artist",
    versions: [
      {
        creatorId: "antonio-artist",
        title: null
      },
      {
        creatorId: "dave",
        title: "Stinks Like Crypto"
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
    artist: "Antonio",
    genre: "Electronic",
    duration: "3:40",
    thumbnail:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=240&q=80",
    creatorId: "antonio-artist",
    versions: [
      {
        creatorId: "antonio-artist",
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
      },
      {
        creatorId: "yasmin-d",
        title: "Neon Drift"
      },
      {
        creatorId: "jules-b",
        title: "Strings Mix"
      },
      {
        creatorId: "jp",
        title: "Midnight Cut"
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
    creatorId: "nora-isles",
    versions: [
      {
        creatorId: "nora-isles",
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
    creatorId: "orbit-84",
    versions: [
      {
        creatorId: "orbit-84",
        title: null
      },
      {
        creatorId: "tom-g",
        title: "Unplugged"
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
    creatorId: "rhea-co",
    versions: [
      {
        creatorId: "rhea-co",
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
      },
      {
        creatorId: "alex-m",
        title: "Extended Intro"
      },
      {
        creatorId: "rico-t",
        title: "Warehouse Mix"
      },
      {
        creatorId: "dave",
        title: "Piano Version"
      },
      {
        creatorId: "ivy-m",
        title: "Slow Burn Edit"
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
    creatorId: "oriel-artist",
    versions: [
      {
        creatorId: "oriel-artist",
        title: null
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
    creatorId: "twelve-pines",
    versions: [
      {
        creatorId: "twelve-pines",
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
      },
      {
        creatorId: "dave",
        title: "Demo Dub"
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
