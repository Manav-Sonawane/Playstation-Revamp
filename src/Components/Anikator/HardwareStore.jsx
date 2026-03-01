import React, { useRef, useState, useEffect } from 'react';
import { useDualSenseWS } from './useDualSenseWS';
import gsap from 'gsap';

const storeCategories = [
    {
        title: "PlayStation Consoles",
        items: [
            {
                id: 'c1',
                name: 'Spider-Man 2 Limited Edition',
                description: 'Get the PS5 console – Marvel’s Spider-Man 2 Limited Edition Bundle with a symbiote takeover design, and experience the next game in the Marvel’s Spider-Man franchise.',
                price: '$599.99',
                image: '/whatsapp_2.png', // Main Spider-Man console image
                bg: 'bg-[#b60717]', // Spiderman red vibe
                scale: 1.2
            },
            {
                id: 'c2',
                name: 'Skull Titan Limited Edition',
                description: 'Dominating grey and aggressive design lines define the Skull Titan Limited Edition. Become the boss.',
                price: '$549.99',
                image: '/titan.webp',
                bg: 'bg-[#212121]'
            },
            {
                id: 'c3',
                name: 'Rogue Ninja Limited Edition',
                description: 'Sleek, stealthy, and deadly. The Rogue Ninja console cover is built for the shadows.',
                price: '$549.99',
                image: '/rogue.webp',
                bg: 'bg-[#0f1015]'
            },
        ]
    },
    {
        title: "DualSense Controllers",
        items: [
            { id: 'd1', name: 'DualSense Moss Green', description: 'Custom Edition Design', price: '$89.99', image: '/controller1_1.webp', hoverImage: '/controller1_2.webp', bg: 'bg-[#1f2c14]' },
            { id: 'd2', name: 'DualSense Cosmic Pink', description: 'DualSense Wireless Controller', price: '$74.99', image: '/controller2.webp', bg: 'bg-[#280b1e]' },
            { id: 'd3', name: 'DualSense Crocodile White', description: 'DualSense Edge Wireless Controller', price: '$199.99', image: '/controller3.webp', bg: 'bg-[#2a2a2a]' },
            { id: 'd4', name: 'DualSense Spider-Man 2 Edition', description: 'DualSense Limited Edition Spider-Man 2 Wireless Controller with intense red and black symbiote design.', price: '$79.99', image: '/whatsapp_1.png', bg: 'bg-[#b60717]', scale: 1.8 },
        ]
    }
];

export default function HardwareStore() {
    const { action, joystick } = useDualSenseWS();

    // Joystick cursors
    const cursorRef = useRef(null);
    const trailRef = useRef(null);
    const cursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const trailPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const joystickRef = useRef({ dx: 0, dy: 0 });

    const storeContainerRef = useRef(null);

    // UI layout state
    const [activeSection, setActiveSection] = useState(0);
    const [activeCols, setActiveCols] = useState([0, 0]);

    // Track active item directly for simpler rendering 
    const activeCategory = storeCategories[activeSection];
    const activeColIdx = activeCols[activeSection];
    const activeItem = activeCategory.items[activeColIdx];

    // Update joystick ref naturally
    useEffect(() => {
        joystickRef.current = joystick || { dx: 0, dy: 0 };
    }, [joystick]);

    // Loop for cursor and trailer physics
    useEffect(() => {
        let frameId;
        const speed = 6;

        const loop = () => {
            const { dx, dy } = joystickRef.current;
            if (dx !== 0 || dy !== 0) {
                cursorPos.current.x = Math.max(0, Math.min(window.innerWidth, cursorPos.current.x + dx * speed));
                cursorPos.current.y = Math.max(0, Math.min(window.innerHeight, cursorPos.current.y + dy * speed));
            }

            // Trailing physics lerp (follower effect)
            trailPos.current.x += (cursorPos.current.x - trailPos.current.x) * 0.15;
            trailPos.current.y += (cursorPos.current.y - trailPos.current.y) * 0.15;

            if (cursorRef.current && trailRef.current) {
                cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-10%, -10%)`;
                trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px) translate(-10%, -10%) scale(0.6)`;

                // Track interaction with hover targets using the physics cursor instead of mouse
                const targetElement = document.elementFromPoint(cursorPos.current.x, cursorPos.current.y);
                const hoverContainer = targetElement?.closest('.custom-hover-container');

                document.querySelectorAll('.custom-hover-container.is-hovered').forEach(el => {
                    if (el !== hoverContainer) el.classList.remove('is-hovered');
                });

                if (hoverContainer) {
                    hoverContainer.classList.add('is-hovered');
                }
            }

            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameId);
    }, []);

    // Handle controller navigation actions
    useEffect(() => {
        if (!action) return;

        if (action === 'DPAD_DOWN') {
            setActiveSection(prev => Math.min(storeCategories.length - 1, prev + 1));
        } else if (action === 'DPAD_UP') {
            setActiveSection(prev => Math.max(0, prev - 1));
        } else if (action === 'DPAD_LEFT') {
            setActiveCols(prev => {
                const newCols = [...prev];
                newCols[activeSection] = Math.max(0, newCols[activeSection] - 1);
                return newCols;
            });
        } else if (action === 'DPAD_RIGHT') {
            setActiveCols(prev => {
                const newCols = [...prev];
                newCols[activeSection] = Math.min(storeCategories[activeSection].items.length - 1, newCols[activeSection] + 1);
                return newCols;
            });
        } else if (action === 'R_TRIGGER') {
            // "Buy" animation flash
            gsap.fromTo(storeContainerRef.current,
                { opacity: 0.5, filter: 'brightness(1.5)' },
                { opacity: 1, filter: 'brightness(1)', duration: 0.5, ease: "power2.out" }
            );
        }
    }, [action]);

    const [scrollTimer, setScrollTimer] = useState(null);

    const handleWheel = (e) => {
        // Simple debounce to prevent scrolling through too quickly
        if (scrollTimer) return;

        setScrollTimer(setTimeout(() => setScrollTimer(null), 350));

        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            if (e.deltaY > 30) {
                setActiveSection(prev => Math.min(storeCategories.length - 1, prev + 1));
            } else if (e.deltaY < -30) {
                setActiveSection(prev => Math.max(0, prev - 1));
            }
        } else {
            if (e.deltaX > 30) {
                setActiveCols(prev => {
                    const newCols = [...prev];
                    newCols[activeSection] = Math.min(storeCategories[activeSection].items.length - 1, newCols[activeSection] + 1);
                    return newCols;
                });
            } else if (e.deltaX < -30) {
                setActiveCols(prev => {
                    const newCols = [...prev];
                    newCols[activeSection] = Math.max(0, newCols[activeSection] - 1);
                    return newCols;
                });
            }
        }
    };

    return (
        <div ref={storeContainerRef} onWheel={handleWheel} className={`relative w-screen h-screen overflow-hidden font-sans text-white transition-colors duration-700 ease-in-out ${activeItem?.bg || 'bg-black'}`}>

            {/* Department Header */}
            <header className="absolute top-[80px] left-0 w-full flex items-center justify-end px-16 z-50 pointer-events-none">
                {/* Department Indicator Mini-map */}
                <div className="flex space-x-10 text-sm font-bold tracking-widest uppercase bg-black/40 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 pointer-events-auto">
                    {storeCategories.map((cat, idx) => (
                        <span key={cat.title} onClick={() => setActiveSection(idx)} className={`cursor-pointer hover:text-white transition-all duration-300 ${activeSection === idx ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/30'}`}>
                            {cat.title}
                        </span>
                    ))}
                </div>
            </header>

            {/* Vertical Scroll Track for Departments */}
            <div className="absolute inset-0 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-10"
                style={{ transform: `translateY(-${activeSection * 100}vh)` }}>

                {storeCategories.map((category, rowIdx) => (
                    <div key={category.title} className="w-full h-[100vh] relative overflow-hidden">

                        {/* Horizontal Scroll Track for Items inside each Department */}
                        <div className="absolute top-0 left-0 h-full flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{ transform: `translateX(-${activeCols[rowIdx] * 100}vw)` }}>

                            {category.items.map((item, colIdx) => (
                                <div key={item.id} className="w-[100vw] h-[100vh] relative flex-shrink-0 flex items-center justify-center">
                                    {/* Large Background Image or Render */}
                                    <div className="absolute inset-0 w-full h-full flex items-center justify-start pl-[10vw] z-50 pointer-events-none">
                                        {/* Beautiful full screen floating visual layout with hover support */}
                                        <div className={`relative w-auto aspect-video flex items-center justify-start group custom-hover-container cursor-pointer pointer-events-auto transform transition-all duration-500 hover:scale-105 ${category.title === 'DualSense Controllers' ? 'h-[95%] max-w-[85%]' : 'h-[75%] max-w-[65%]'}`} style={{ transform: 'translateY(-2rem)' }}>
                                            {item.hoverImage ? (
                                                <>
                                                    <img src={item.image} alt={item.name} className="base-image absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500" style={item.scale ? { transform: `scale(${item.scale})` } : {}} />
                                                    <img src={item.hoverImage} alt={item.name + ' hover'} className="hover-image absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 opacity-0" style={item.scale ? { transform: `scale(${item.scale})` } : {}} />
                                                </>
                                            ) : (-
                                                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500" style={item.scale ? { transform: `scale(${item.scale})` } : {}} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Vignette / Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

                                    {/* Info Overlay (Bottom Right Concept) */}
                                    <div className="absolute bottom-16 right-20 flex flex-col items-end text-right z-30 max-w-xl">
                                        <p className="text-[#00E5FF] font-bold text-sm tracking-widest mb-3 uppercase">{category.title}</p>
                                        <h2 className="text-6xl font-black tracking-tight leading-none mb-6 text-white drop-shadow-lg">{item.name}</h2>
                                        <p className="text-xl text-white/80 mb-10 leading-relaxed font-medium drop-shadow-md">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center space-x-6">
                                            <span className="text-3xl font-black tracking-tight mr-4">{item.price}</span>
                                            <button className="bg-white text-black px-10 py-5 rounded-full font-black tracking-widest uppercase hover:bg-gray-200 transition-colors shadow-2xl flex items-center space-x-3">
                                                <span>Add to Cart</span>
                                                <span className="text-sm opacity-50 ml-2">PRESS R1/R2</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* Sub-Item Pagination Dots indicator for this row (Bottom Center) */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 z-20 pointer-events-auto">
                            {category.items.map((_, dotIdx) => (
                                <div
                                    key={dotIdx}
                                    onClick={() => setActiveCols(prev => { const n = [...prev]; n[rowIdx] = dotIdx; return n; })}
                                    className={`cursor-pointer h-2 rounded-full hover:bg-white/80 transition-all duration-500 ${activeCols[rowIdx] === dotIdx ? 'w-12 bg-white' : 'w-2 bg-white/30'}`}
                                ></div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

            {/* Global HUD Directions */}
            <div className="absolute left-16 bottom-16 z-20 text-white/40 font-bold tracking-widest text-sm flex flex-col space-y-4">
                <span className="flex items-center space-x-3"><span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/80">▲▼</span> <span>Change Department</span></span>
                <span className="flex items-center space-x-3"><span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/80">◀▶</span> <span>Browse Edition</span></span>
            </div>

            {/* Astro pointer custom cursor layer - Followers */}
            <img
                src="/astro_cursor.png"
                alt="Pointer Trail"
                className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-40 opacity-40 blur-[2px] transition-transform duration-75 hidden"
            />
            <img
                src="/astro_cursor.png"
                alt="Pointer"
                className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-50 drop-shadow-[0_0_15px_rgba(0,67,156,0.6)] transition-transform duration-75 hidden"
            />
        </div>
    );
}
