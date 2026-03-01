import React, { useRef, useState, useEffect } from 'react';
import { useDualSenseWS } from './Anikator/useDualSenseWS';
import gsap from 'gsap';
import { Trophy, Star, Gamepad2, Settings, Users, Bell } from 'lucide-react';

const profileData = {
    username: "Astro_Explorer",
    level: 42,
    progress: 75,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Astro",
    trophies: {
        platinum: 12,
        gold: 45,
        silver: 128,
        bronze: 342
    },
    sections: [
        {
            title: "Recently Played",
            items: [
                { id: 'g1', name: "Astro's Playroom", progress: "100%", lastPlayed: "2 hours ago", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80" },
                { id: 'g2', name: "Spider-Man 2", progress: "85%", lastPlayed: "Yesterday", image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80" },
                { id: 'g3', name: "God of War Ragnarök", progress: "42%", lastPlayed: "3 days ago", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" },
                { id: 'g4', name: "Horizon Forbidden West", progress: "15%", lastPlayed: "1 week ago", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80" },
            ]
        },
        {
            title: "Trophy Collection",
            items: [
                { id: 't1', name: "Platinum Master", type: "Platinum", game: "Astro's Playroom", image: "https://api.dicebear.com/7.x/shapes/svg?seed=platinum" },
                { id: 't2', name: "Hero of NYC", type: "Gold", game: "Spider-Man 2", image: "https://api.dicebear.com/7.x/shapes/svg?seed=gold" },
                { id: 't3', name: "God of War", type: "Gold", game: "God of War", image: "https://api.dicebear.com/7.x/shapes/svg?seed=war" },
                { id: 't4', name: "Survivor", type: "Silver", game: "The Last of Us", image: "https://api.dicebear.com/7.x/shapes/svg?seed=silver" },
            ]
        }
    ]
};

export default function Profile() {
    const { action, joystick } = useDualSenseWS();

    const [activeSection, setActiveSection] = useState(0);
    const [activeCols, setActiveCols] = useState([0, 0]);

    const activeItem = profileData.sections[activeSection].items[activeCols[activeSection]];

    useEffect(() => {
        if (!action) return;
        if (action === 'BACK' || action === 'DOWN') {
            setActiveSection(prev => Math.min(profileData.sections.length - 1, prev + 1));
        } else if (action === 'SELECT' || action === 'UP') {
            setActiveSection(prev => Math.max(0, prev - 1));
        } else if (action === 'LEFT') {
            setActiveCols(prev => {
                const newCols = [...prev];
                newCols[activeSection] = Math.max(0, newCols[activeSection] - 1);
                return newCols;
            });
        } else if (action === 'RIGHT') {
            setActiveCols(prev => {
                const newCols = [...prev];
                newCols[activeSection] = Math.min(profileData.sections[activeSection].items.length - 1, newCols[activeSection] + 1);
                return newCols;
            });
        }
    }, [action]);

    return (
        <div className="relative w-screen h-screen bg-black text-white font-sans overflow-hidden">
            {/* Dynamic Background Atmosphere */}
            <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
                {activeItem?.image && (
                    <img key={activeItem.id} src={activeItem.image} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-40 blur-3xl scale-110 animate-in fade-in duration-1000" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black pointer-events-none"></div>
            </div>

            {/* Main Content Area spaced to sit below global navbar */}
            <div className="relative w-full h-full pt-[90px] flex flex-col">
                {/* User Profile Header */}
                <div className="relative z-10 px-24 pt-10 flex items-center space-x-12 animate-in fade-in slide-in-from-top-12 duration-1000">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5FF] to-[#00439C] rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
                        <img src={profileData.avatar} alt="Avatar" className="relative w-40 h-40 rounded-full border-4 border-white/20 bg-black/40 backdrop-blur-xl object-cover" />
                    </div>

                    <div className="flex-1 pb-4">
                        <div className="flex items-center space-x-4 mb-2">
                            <h1 className="text-6xl font-black tracking-tighter">{profileData.username}</h1>
                            <div className="bg-[#00E5FF] text-black px-4 py-1 rounded-full text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,229,255,0.4)]">Plus</div>
                        </div>

                        <div className="flex items-center space-x-8 font-bold bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl w-max shadow-lg mt-4 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,112,209,0.3)]">
                            <div className="flex items-center space-x-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="text-white text-lg drop-shadow-md">Level {profileData.level}</span>
                            </div>
                            <div className="w-px h-6 bg-white/20"></div>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div><span className="text-white/80">{profileData.trophies.platinum}</span></div>
                                <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div><span className="text-white/80">{profileData.trophies.gold}</span></div>
                                <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded-full bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.8)]"></div><span className="text-white/80">{profileData.trophies.silver}</span></div>
                                <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded-full bg-orange-700 shadow-[0_0_8px_rgba(194,65,12,0.8)]"></div><span className="text-white/80">{profileData.trophies.bronze}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-6 pb-6 pr-10">
                        <Settings className="w-6 h-6 text-white/40 hover:text-white transition-colors cursor-pointer" />
                        <Users className="w-6 h-6 text-white/40 hover:text-white transition-colors cursor-pointer" />
                        <Bell className="w-6 h-6 text-white/40 hover:text-white transition-colors cursor-pointer" />
                    </div>
                </div>

                {/* Main Content Sections */}
                <div
                    className="relative z-10 px-24 mt-12 space-y-12 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ transform: `translateY(-${activeSection * 300}px)` }}
                >
                    {profileData.sections.map((section, sIdx) => (
                        <div key={section.title} className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeSection === sIdx ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4'}`}>
                            <div className="flex items-center space-x-4 mb-6">
                                {sIdx === 0 ? <Gamepad2 className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" /> : <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />}
                                <h2 className="text-3xl font-black tracking-widest uppercase drop-shadow-md">{section.title}</h2>
                            </div>

                            <div className="relative h-[250px] overflow-visible">
                                <div
                                    className="flex space-x-6 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                    style={{ transform: `translateX(-${activeCols[sIdx] * 424}px)` }}
                                >
                                    {section.items.map((item, iIdx) => (
                                        <div
                                            key={item.id}
                                            className={`w-[400px] h-[230px] flex-shrink-0 relative group rounded-[20px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${activeSection === sIdx && activeCols[sIdx] === iIdx ? 'border-2 border-white/90 scale-105 shadow-[0_8px_32px_rgba(0,112,209,0.5),0_0_0_1px_rgba(255,255,255,0.15)] z-10' : 'border border-white/10 opacity-60 scale-95 z-0 shadow-[0_2px_12px_rgba(0,0,0,0.5)] group-hover:border-white/30 group-hover:opacity-80'}`}
                                            onClick={() => { setActiveSection(sIdx); setActiveCols(prev => { const n = [...prev]; n[sIdx] = iIdx; return n; }) }}
                                        >
                                            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                                <h3 className="font-black text-2xl mb-2 text-white drop-shadow-md truncate">{item.name}</h3>
                                                <div className="flex justify-between items-end">
                                                    <span className="text-sm text-white/80 font-bold uppercase tracking-wider">{item.progress || item.type}</span>
                                                    <span className="text-xs text-white/50 font-black uppercase tracking-widest">{item.lastPlayed || item.game}</span>
                                                </div>
                                                {item.progress && (
                                                    <div className="mt-4 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                                                        <div className="h-full bg-white transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.8)]" style={{ width: item.progress }}></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* HUD */}
            <div className="absolute left-20 bottom-12 z-20 text-white/40 font-bold tracking-widest text-[10px] space-y-2 uppercase flex flex-col pointer-events-none">
                <span className="flex items-center space-x-3"><span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/60">▲▼</span> <span>Switch Rows</span></span>
                <span className="flex items-center space-x-3"><span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/60">◀▶</span> <span>Navigate Collection</span></span>
            </div>
        </div>
    );
}
