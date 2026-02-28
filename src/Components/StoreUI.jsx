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
      color: "from-[#0070d1]/40"
    },
    { 
      title: "WE BARE BEARS", 
      subtitle: "The Movie Game", 
      bg: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=1920&q=80",
      thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
      color: "from-[#00e676]/40"
    },
    { 
      title: "VANGUARD", 
      subtitle: "Season One", 
      bg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
      thumb: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80",
      color: "from-[#00d4ff]/40"
    }
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % games.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);

  return (
    <div className="relative w-full bg-[#0a0e1a] text-white font-sans overflow-hidden" style={{ minHeight: 'calc(100vh - 56px)' }}>
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
          <p className="text-2xl tracking-[0.4em] font-light mt-[-10px] uppercase text-[#8a9bb5]">
            {games[currentIndex].subtitle}
          </p>
          <button className="mt-10 px-10 py-3 bg-[#0070d1] hover:bg-[#0088ff] rounded-xl border border-[#0070d1] hover:border-[#0088ff] transition-all shadow-lg hover:shadow-[#0070d1]/40 font-semibold">
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
                className="p-3 bg-[#141824] hover:bg-[#1e2433] rounded-full border border-[#1e2d45] hover:border-[#0070d1] transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="p-3 bg-[#141824] hover:bg-[#1e2433] rounded-full border border-[#1e2d45] hover:border-[#0070d1] transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {games.map((game, i) => (
              <div 
                key={i}
                className={`group relative h-32 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border ${i === currentIndex ? 'ring-4 ring-[#0070d1] scale-105 border-[#0070d1]' : 'border-[#1e2d45] opacity-50 hover:opacity-100 hover:border-[#0070d1]'}`}
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
      </div>
    </div>
  );
};

export default PSStoreSidebarUI;