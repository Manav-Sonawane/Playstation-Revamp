export const userProfile = {
  username: "GamerPro",
  level: 47,
  nextLevel: 48,
  currentXP: 8750,
  nextLevelXP: 10000,
  avatar: null, // will use placeholder initials
};

export const heroGame = {
  id: 1,
  title: "Stellar Horizon",
  description:
    "Embark on an epic space odyssey across uncharted galaxies. Build alliances, customize your ship, and uncover the mysteries of ancient civilizations.",
  rating: 4.8,
  genre: "Sci-Fi RPG",
  players: "1-4 Players",
  matchPercent: 98,
  gradient:
    "radial-gradient(ellipse at 30% 40%, #0d2a5e 0%, #050d1f 60%, #000508 100%)",
};

export const continuePlayingGames = [
  {
    id: 1,
    title: "Stellar Horizon",
    genre: "Sci-Fi RPG",
    progress: 67,
    gradient: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 50%, #000510 100%)",
  },
  {
    id: 2,
    title: "Neon Rush",
    genre: "Racing",
    progress: 67,
    gradient: "linear-gradient(135deg, #1a0a00 0%, #3d1f00 40%, #8b3a00 100%)",
  },
];

export const personalizedGames = [
  {
    id: 1,
    title: "Neon Rush",
    genre: "Racing",
    rating: 4.6,
    matchPercent: 95,
    price: 49.99,
    description:
      "High-octane cyberpunk racing through neon-lit cityscapes. Customize your ride and dominate the underground racing scene.",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #3d1f00 40%, #8b3a00 100%)",
  },
  {
    id: 2,
    title: "Shadow's Legacy",
    genre: "Action-Adventure",
    rating: 4.9,
    matchPercent: 92,
    price: 59.99,
    description:
      "A gripping tale of revenge and redemption in a dark fantasy world. Master combat, solve puzzles, and make choices that shape your destiny.",
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 50%, #0d2b0d 100%)",
  },
];

export const onlineFriends = [
  {
    id: 1,
    username: "ShadowNinja47",
    status: "in-game",
    currentGame: "Stellar Horizon",
  },
  { id: 2, username: "CosmicGamer", status: "online", currentGame: null },
  {
    id: 3,
    username: "PixelMaster99",
    status: "in-game",
    currentGame: "Neon Rush",
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
    title: "Stellar Horizon",
    genre: "Sci-Fi RPG",
    hoursPlayed: 142,
    lastPlayed: "2 hours ago",
    gradient: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 50%, #000510 100%)",
  },
  {
    id: 2,
    title: "Neon Rush",
    genre: "Racing",
    hoursPlayed: 87,
    lastPlayed: "Yesterday",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #3d1f00 40%, #8b3a00 100%)",
  },
  {
    id: 3,
    title: "Shadow's Legacy",
    genre: "Action",
    hoursPlayed: 65,
    lastPlayed: "3 days ago",
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 50%, #0d2b0d 100%)",
  },
  {
    id: 4,
    title: "Cyber Strike",
    genre: "FPS",
    hoursPlayed: 203,
    lastPlayed: "1 week ago",
    gradient: "linear-gradient(135deg, #1a0a1a 0%, #3a1a3a 50%, #2b0d2b 100%)",
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
