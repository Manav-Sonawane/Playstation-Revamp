import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';

const gameData = [
    { id: 101, title: 'Spider-Man 2', image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=800', desc: 'Action • Adventure' },
    { id: 102, title: 'God of War Ragnarök', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', desc: 'Action RPG' },
    { id: 103, title: 'Horizon Forbidden West', image: 'https://images.unsplash.com/photo-1621252178335-51347047d953?auto=format&fit=crop&q=80&w=800', desc: 'Open World RPG' },
    { id: 104, title: 'Gran Turismo 7', image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=800', desc: 'Racing Simulator' },
    { id: 105, title: 'The Last of Us Part I', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800', desc: 'Survival Horror' }
];

/**
 * AnikatorCarousel — A GSAP-powered horizontal card carousel.
 * Reacts to 'action' inputs ('LEFT', 'RIGHT', 'SELECT').
 */
export const AnikatorCarousel = forwardRef(({ action, onSelect }, ref) => {
    const [activeIndex, setActiveIndex] = useState(2);
    const containerRef = useRef();
    const cardsRef = useRef([]);

    useEffect(() => {
        if (!action) return;

        if (action === 'DPAD_LEFT') {
            setActiveIndex(prev => Math.max(0, prev - 1));
        } else if (action === 'DPAD_RIGHT') {
            setActiveIndex(prev => Math.min(gameData.length - 1, prev + 1));
        } else if (action === 'CROSS') {
            const target = cardsRef.current[activeIndex];
            gsap.to(target, {
                scale: 1.05,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => onSelect && onSelect(gameData[activeIndex])
            });
        }
    }, [action, onSelect, activeIndex]);

    useEffect(() => {
        cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const isCenter = i === activeIndex;
            const offset = i - activeIndex;

            let x = offset * 280;
            let scale = isCenter ? 1 : 0.8;
            let opacity = isCenter ? 1 : 0.5;
            let zIndex = isCenter ? 20 : 10 - Math.abs(offset);
            let blur = isCenter ? 0 : 5;

            gsap.to(card, {
                x: x,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                filter: `blur(${blur}px)`,
                duration: 0.55,
                ease: 'power3.out'
            });
        });
    }, [activeIndex]);

    return (
        <div
            className="relative h-80 flex items-center justify-center w-full"
            ref={containerRef}
            style={{ perspective: '1000px' }}
        >
            {gameData.map((game, i) => (
                <div
                    key={game.id}
                    ref={el => cardsRef.current[i] = el}
                    className="absolute w-64 h-80 rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.35)] overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer"
                    style={{ transformOrigin: 'center center' }}
                >
                    <img src={game.image} alt={game.title} className="w-full h-[55%] object-cover" />
                    <div className="p-5 flex flex-col justify-end h-[45%] pb-6">
                        <h3 className="font-bold text-white text-lg leading-tight drop-shadow-md">{game.title}</h3>
                        <p className="text-sm text-white/50 mt-1 font-medium">{game.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
});
