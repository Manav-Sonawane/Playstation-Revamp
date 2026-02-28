import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PSStoreSidebarUI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const games = [
    { 
      title: "KENA", 
      subtitle: "Bridge of Spirits", 
      bg: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=1920&q=80",
      thumb: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
      color: "from-blue-900/40"
    },
    { 
      title: "WE BARE BEARS", 
      subtitle: "The Movie Game", 
      bg: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=1920&q=80",
      thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
      color: "from-green-900/40"
    },
    { 
      title: "VANGUARD", 
      subtitle: "Season One", 
      bg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
      thumb: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80",
      color: "from-red-900/40"
    }
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % games.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      
      {/* 1. SIDE NAVBAR */}
      <aside className="w-24 flex flex-col items-center py-8 border-r border-white/5 bg-black/40 backdrop-blur-xl z-50">
        <div className="mb-12 bg-blue-600 p-2 rounded shadow-lg shadow-blue-500/20">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-[10px]">PS</span>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col space-y-12 items-center text-[10px] font-bold tracking-widest uppercase [writing-mode:vertical-lr] rotate-180 opacity-60">
            <li className="hover:opacity-100 cursor-pointer transition-all">Latest</li>
            <li className="hover:opacity-100 cursor-pointer transition-all">Deals</li>
            <li className="hover:opacity-100 cursor-pointer transition-all">Collections</li>
            <li className="hover:opacity-100 cursor-pointer transition-all">Subscriptions</li>
            <li className="opacity-100 text-white border-r-2 border-white pr-2">Browse</li>
          </ul>
        </nav>

        <div className="flex flex-col space-y-8 opacity-60 pb-4">
          <Search size={20} className="hover:opacity-100 cursor-pointer" />
          <Heart size={20} className="hover:opacity-100 cursor-pointer" />
          <ShoppingCart size={20} className="hover:opacity-100 cursor-pointer" />
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${games[currentIndex].bg})` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${games[currentIndex].color} via-black/20 to-transparent`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Title */}
        <div className="relative z-10 pl-16 pt-32 select-none">
          <motion.h1 
            key={`title-${currentIndex}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-[120px] font-black leading-none tracking-tighter italic"
          >
            {games[currentIndex].title}
          </motion.h1>
          <p className="text-2xl tracking-[0.4em] font-light mt-[-10px] uppercase opacity-70">
            {games[currentIndex].subtitle}
          </p>
          <button className="mt-10 px-10 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white hover:text-black transition-all">
            Out Now
          </button>
        </div>

        {/* 3. CAROUSEL CONTROLS & MUST SEE */}
        <div className="absolute bottom-12 left-0 w-full px-16 z-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-wide">Must see</h3>
            <div className="flex space-x-4">
              <button 
                onClick={handlePrev}
                className="p-3 bg-white/5 hover:bg-white/20 rounded-full border border-white/10 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="p-3 bg-white/5 hover:bg-white/20 rounded-full border border-white/10 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {games.map((game, i) => (
              <div 
                key={i}
                className={`group relative h-32 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${i === currentIndex ? 'ring-4 ring-white scale-105' : 'opacity-50 hover:opacity-100'}`}
                onClick={() => setCurrentIndex(i)}
              >
                <img src={game.thumb} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                  <span className="text-xs font-black uppercase tracking-tighter">{game.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PSStoreSidebarUI;