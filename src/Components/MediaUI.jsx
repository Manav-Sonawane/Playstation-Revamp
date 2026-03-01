import React, { useState } from 'react';
import { Grid, Monitor, Music, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// app icons shown in the horizontal navbar
const mediaApps = [
    {
        id: 1,
        icon: <Grid size={24} />,
        color: 'bg-blue-600',
        glow: '#60a5fa',
    },
    {
        id: 2,
        icon: <Monitor size={24} />,
        color: 'bg-green-600',
        glow: '#34d399',
    },
    {
        id: 3,
        icon: <Music size={24} />,
        color: 'bg-pink-600',
        glow: '#f472b6',
    },
    {
        id: 4,
        icon: <PlayCircle size={24} />,
        color: 'bg-yellow-600',
        glow: '#fbbf24',
    },
];

// featured carousel data used to populate the bottom row and the hero panel
const featuredContent = [
    {
        id: 1,
        title: 'The Mandalorian',
        description: 'A lone gunfighter makes his way through the outer reaches of the galaxy.',
        provider: 'Disney+',
        hero: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/ea78b4f8-f180-41e5-9aac-9e99c96fb4ac/compose?aspectRatio=1.78&format=webp&width=1200',
        thumb: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/ea78b4f8-f180-41e5-9aac-9e99c96fb4ac/compose?aspectRatio=1.78&format=webp&width=1200',
    },
    {
        id: 2,
        title: 'Stranger Things',
        description: 'Mysteries unfold in a small town when a girl with telekinetic powers appears.',
        provider: 'Netflix',
        hero: 'https://cdn.arstechnica.net/wp-content/uploads/2026/01/strangerTOP.jpg',
        thumb: 'https://cdn.arstechnica.net/wp-content/uploads/2026/01/strangerTOP.jpg',
    },
    {
        id: 3,
        title: 'Horizon Zero Dawn',
        description: 'Follow Aloy in a future Earth dominated by mechanical creatures.',
        provider: 'HBO Max',
        hero: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-Kmm8NnDoaxVLNx9LnKzXsGPsk-_A2PiLQ&s',
        thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-Kmm8NnDoaxVLNx9LnKzXsGPsk-_A2PiLQ&s',
    },
];

const PSMediaUI = () => {
    const [selectedContent, setSelectedContent] = useState(featuredContent[2]);

    return (
        <div className="relative h-screen w-full bg-black text-white font-sans overflow-hidden select-none flex flex-col pt-[80px]">

            {/* 1. BACKGROUND LAYER */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={selectedContent.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={selectedContent.hero}
                            className="w-full h-full object-cover"
                            alt="Background"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Layered Overlays for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 3. APP ICONS (Positioned with margin to avoid header clash) */}
            <nav className="relative z-20 px-16 mt-4 flex space-x-4 shrink-0">
                {mediaApps.map((app) => (
                    <motion.div
                        key={app.id}
                        whileHover={{ scale: 1.1, boxShadow: `0px 0px 20px ${app.glow}` }}
                        className={`w-14 h-14 ${app.color} rounded-xl flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-white/60 transition-all`}
                    >
                        {app.icon}
                    </motion.div>
                ))}
            </nav>

            {/* 4. HERO CONTENT (Flex-1 allows this to push the carousel down) */}
            <main className="relative z-10 px-16 flex-1 flex flex-col justify-center pb-20 pointer-events-none">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={selectedContent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-7xl font-black mb-6 tracking-tighter leading-none">
                            {selectedContent.title}
                        </h1>
                        <p className="text-xl text-zinc-300 font-medium leading-relaxed">
                            {selectedContent.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* 5. BOTTOM CAROUSEL (Pinned to bottom with safety padding) */}
            <section className="relative z-20 w-full pb-12 shrink-0">
                <h3 className="px-16 text-xs font-black mb-4 tracking-widest uppercase opacity-40">Featured</h3>
                <div className="flex space-x-6 px-16 overflow-x-auto no-scrollbar">
                    {featuredContent.map((item) => (
                        <motion.div
                            key={item.id}
                            onMouseEnter={() => setSelectedContent(item)}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="flex-shrink-0 w-56 group cursor-pointer"
                        >
                            <div className={`aspect-video rounded-xl overflow-hidden border-4 transition-all ${selectedContent.id === item.id ? 'border-white' : 'border-transparent opacity-50'
                                }`}>
                                <img src={item.thumb} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-3">
                                <p className="text-[10px] font-bold text-blue-400 uppercase">{item.provider}</p>
                                <p className={`text-sm font-bold truncate transition-opacity ${selectedContent.id === item.id ? 'opacity-100' : 'opacity-0'}`}>
                                    {item.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
};

export default PSMediaUI;
