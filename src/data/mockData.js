export const userProfile = {
  username: "GamerPro",
  level: 47,
  nextLevel: 48,
  currentXP: 8750,
  nextLevelXP: 10000,
  avatar: null, // will use placeholder initials
};

export const featuredGames = [
  {
    id: 1,
    title: "Call of Duty",
    description:
      "The world's best-selling first-person action series returns. Fight across iconic battlegrounds, command elite operators, and dominate the warzone in heart-pounding multiplayer action.",
    rating: 4.8,
    genre: "First-Person Shooter",
    players: "1-150 Players",
    matchPercent: 98,
    poster: "/store-banners/cod-banner.png",
    logo: "/store-logos/cod-logo.png",
    accentColor: "#c8981a",
    overlayGradient:
      "linear-gradient(to right, rgba(5,8,18,0.97) 30%, rgba(5,8,18,0.6) 65%, transparent 100%)",
  },
  {
    id: 2,
    title: "Kena: Bridge of Spirits",
    description:
      "A story-driven action adventure set in a charming world full of ancient spirits and hidden corruptions. Guide lost souls and restore balance to a forgotten community.",
    rating: 4.9,
    genre: "Action-Adventure",
    players: "1 Player",
    matchPercent: 95,
    poster: "/store-banners/kena-banner.png",
    logo: "/store-logos/kena-logo.png",
    accentColor: "#3ab5e0",
    overlayGradient:
      "linear-gradient(to right, rgba(3,12,20,0.97) 30%, rgba(3,12,20,0.6) 65%, transparent 100%)",
  },
  {
    id: 3,
    title: "Moving Out",
    description:
      "Become a furniture removal specialist with no regard for personal property. It's a frantic physics-based moving simulator that creates crazy fun for solo and co-op play.",
    rating: 4.6,
    genre: "Co-op Party Game",
    players: "1-4 Players",
    matchPercent: 91,
    poster: "/store-banners/moving-out-banner.png",
    logo: "/store-logos/moving-out-logo.png",
    accentColor: "#f04c2e",
    overlayGradient:
      "linear-gradient(to right, rgba(18,6,4,0.97) 30%, rgba(18,6,4,0.6) 65%, transparent 100%)",
  },
];

// Keep heroGame pointing to first featured game for backward compat
export const heroGame = featuredGames[0];

export const continuePlayingGames = [
  {
    id: 1,
    title: "Call of Duty",
    genre: "FPS",
    progress: 67,
    logo: "/store-logos/cod-logo.png",
    poster: "/store-banners/cod-banner.png",
    gradient: "linear-gradient(135deg, #0a0d18 0%, #1a1a28 50%, #050810 100%)",
  },
  {
    id: 2,
    title: "Kena: Bridge of Spirits",
    genre: "Action-Adventure",
    progress: 42,
    logo: "/store-logos/kena-logo.png",
    poster: "/store-banners/kena-banner.png",
    gradient: "linear-gradient(135deg, #030c14 0%, #0a2030 50%, #020810 100%)",
  },
];

export const personalizedGames = [
  {
    id: 1,
    title: "Kena: Bridge of Spirits",
    genre: "Action-Adventure",
    rating: 4.9,
    matchPercent: 95,
    price: 39.99,
    description:
      "A story-driven action adventure set in a charming world full of ancient spirits and hidden corruptions.",
    logo: "/store-logos/kena-logo.png",
    poster: "/store-banners/kena-banner.png",
    gradient: "linear-gradient(135deg, #030c14 0%, #0a2030 50%, #020810 100%)",
  },
  {
    id: 2,
    title: "Moving Out",
    genre: "Co-op Party Game",
    rating: 4.6,
    matchPercent: 91,
    price: 24.99,
    description:
      "A frantic physics-based moving simulator that creates crazy fun for solo and co-op play.",
    logo: "/store-logos/moving-out-logo.png",
    poster: "/store-banners/moving-out-banner.png",
    gradient: "linear-gradient(135deg, #12060 0%, #2a0e0a 50%, #180806 100%)",
  },
];

export const onlineFriends = [
  {
    id: 1,
    username: "ShadowNinja47",
    status: "in-game",
    currentGame: "Call of Duty",
  },
  { id: 2, username: "CosmicGamer", status: "online", currentGame: null },
  {
    id: 3,
    username: "PixelMaster99",
    status: "in-game",
    currentGame: "Kena: Bridge of Spirits",
  },
  { id: 4, username: "GalacticHero", status: "online", currentGame: null },
];

export const recentAchievements = [
  { id: 1, name: "First Victory", xp: 50, unlockedDate: "2026-02-27" },
  { id: 2, name: "Speed Demon", xp: 100, unlockedDate: "2026-02-26" },
  { id: 3, name: "Master Explorer", xp: 150, unlockedDate: "2026-02-25" },
  { id: 4, name: "Perfect Strike", xp: 75, unlockedDate: "2026-02-24" },
];

export const recentlyPlayedGames = [
  {
    id: 1,
    title: "Call of Duty",
    genre: "FPS",
    hoursPlayed: 203,
    lastPlayed: "2 hours ago",
    logo: "/store-logos/cod-logo.png",
    poster: "/store-banners/cod-banner.png",
    gradient: "linear-gradient(135deg, #0a0d18 0%, #1a1a28 50%, #050810 100%)",
    accentColor: "#c8981a",
  },
  {
    id: 2,
    title: "Kena: Bridge of Spirits",
    genre: "Action-Adventure",
    hoursPlayed: 87,
    lastPlayed: "Yesterday",
    logo: "/store-logos/kena-logo.png",
    poster: "/store-banners/kena-banner.png",
    gradient: "linear-gradient(135deg, #030c14 0%, #0a2030 50%, #020810 100%)",
    accentColor: "#3ab5e0",
  },
  {
    id: 3,
    title: "Moving Out",
    genre: "Co-op Party Game",
    hoursPlayed: 65,
    lastPlayed: "3 days ago",
    logo: "/store-logos/moving-out-logo.png",
    poster: "/store-banners/moving-out-banner.png",
    gradient: "linear-gradient(135deg, #120604 0%, #2a0e0a 50%, #180806 100%)",
    accentColor: "#f04c2e",
  },
];

export const userStatistics = {
  totalHourPlay: 12340,
  totalHourPlayPercent: 85,
  fightingTime: 9649,
  fightingTimePercent: 70,
  defenceTime: 10437,
  defenceTimePercent: 80,
};
