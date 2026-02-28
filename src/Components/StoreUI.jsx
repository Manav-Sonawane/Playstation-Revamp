import React from 'react';
import { Search, Heart, ShoppingCart, MoreHorizontal } from 'lucide-react';

const PSStorePremiumUI = () => {
  const bottomTiles = [
    { 
      label: "END OF YEAR DEALS", 
      sub: "SAVE UP TO 75%", 
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
      overlay: "bg-yellow-500/80" 
    },
    { 
      label: "CALL OF DUTY VANGUARD", 
      sub: "SEASON ONE", 
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
      overlay: "bg-orange-900/80" 
    },
    { 
      label: "CALL OF DUTY WARZONE", 
      sub: "PACIFIC", 
      img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
      overlay: "bg-cyan-700/80" 
    },
    { 
      label: "PS4 GAMES", 
      sub: "BROWSE ALL", 
      img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=400&q=80",
      overlay: "bg-zinc-900/80" 
    },
    { 
      label: "EDITORS' CHOICE", 
      sub: "PS VR2", 
      img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=400&q=80",
      overlay: "bg-purple-900/80" 
    },
    { 
      label: "DISCOVER", 
      sub: "ACCESSIBILITY", 
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
      overlay: "bg-blue-600/80" 
    },
  ];

  return (
    <div className="relative h-screen w-full bg-black text-white font-sans overflow-hidden">
      {/* Hero Background - Kena: Bridge of Spirits Vibe */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://wallpaperaccess.com/full/5672457.jpg')` }}
      >
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Top Navigation */}
      <nav className="relative flex items-center justify-between px-16 py-10 z-20">
        <div className="flex items-center space-x-12">
          {/* PS Logo */}
          <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center shadow-lg shadow-blue-500/40">
            <svg viewBox="0 0 50 50" className="w-6 h-6 fill-white">
              <path d="M41.7,30.3c-2.8-1-6.1-1.7-9.5-2.1c-1.4-0.1-2.8-0.2-4.2-0.2v-4.1c3.8,0.2,7.5,0.7,11,1.5c1.4,0.3,2.7,0.7,4,1.1V12.9 c-3.9-1.2-8.3-2-12.8-2.3c-0.7,0-1.5-0.1-2.2-0.1c-11.8,0-21.3,4.1-21.3,9.2c0,3.3,4.1,6.2,10.2,7.7l0,0c-5.8,1.2-10,3.1-10,5.3 c0,3.8,12.7,6.8,28.3,6.8c2.2,0,4.3-0.1,6.4-0.3V30.3z"/>
            </svg>
          </div>
          <ul className="flex space-x-10 text-sm font-semibold tracking-wider uppercase opacity-70">
            <li className="hover:opacity-100 cursor-pointer transition-opacity">Latest</li>
            <li className="hover:opacity-100 cursor-pointer transition-opacity">Deals</li>
            <li className="hover:opacity-100 cursor-pointer transition-opacity">Collections</li>
            <li className="hover:opacity-100 cursor-pointer transition-opacity">Subscriptions</li>
            <li className="opacity-100 border-b-2 border-white pb-1 cursor-pointer">Browse</li>
          </ul>
        </div>

        <div className="flex items-center space-x-8 opacity-80">
          <Search size={22} className="hover:opacity-100 cursor-pointer transition-all" />
          <Heart size={22} className="hover:opacity-100 cursor-pointer transition-all" />
          <ShoppingCart size={22} className="hover:opacity-100 cursor-pointer transition-all" />
          <MoreHorizontal size={22} className="hover:opacity-100 cursor-pointer transition-all" />
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 px-20 pt-16 select-none">
        <div className="max-w-2xl">
          <h1 className="text-[140px] font-black leading-none tracking-tighter italic opacity-95 mb-0">
            KENA
          </h1>
          <p className="text-3xl tracking-[0.4em] font-light mt-[-15px] mb-10 opacity-80 uppercase">
            Bridge of Spirits
          </p>
          <button className="px-10 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/30 text-lg font-medium hover:bg-white hover:text-black hover:scale-105 transition-all duration-300">
            Out Now
          </button>
        </div>
      </main>

      {/* Featured Grid */}
      <div className="absolute bottom-10 left-0 w-full px-16 z-20">
        <h3 className="text-xl font-bold mb-6 tracking-wide">Must see</h3>
        <div className="grid grid-cols-6 gap-4">
          {bottomTiles.map((tile, i) => (
            <div 
              key={i} 
              className="group relative h-36 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:ring-4 ring-white/50"
            >
              {/* Background Game Image */}
              <img src={tile.img} alt={tile.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
              {/* Colored Overlay to match the UI style */}
              <div className={`absolute inset-0 ${tile.overlay} mix-blend-multiply opacity-90`} />
              
              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-[11px] font-bold tracking-widest opacity-80 mb-1">{tile.label}</span>
                <span className="text-sm font-black tracking-tight leading-none uppercase">{tile.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PSStorePremiumUI;