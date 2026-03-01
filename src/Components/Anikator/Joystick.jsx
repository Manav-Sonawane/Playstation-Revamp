import React, { useRef, useState, useCallback } from 'react';

export function Joystick({ onMove, color = '#00d8ff', onActive }) {
    const containerRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false);

    const handleTouchStart = (e) => {
        setActive(true);
        if (onActive) onActive(true);
        handleTouchMove(e);
    };

    const handleTouchMove = useCallback((e) => {
        if (!containerRef.current) return;

        // Prevent scrolling
        if (e.cancelable) {
            e.preventDefault();
        }

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const touch = e.touches[0];
        let dx = touch.clientX - centerX;
        let dy = touch.clientY - centerY;

        // Cap to radius of the container (e.g., 32px for w-16)
        const radius = rect.width / 2;
        const maxRadius = radius;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > maxRadius) {
            dx = (dx / distance) * maxRadius;
            dy = (dy / distance) * maxRadius;
        }

        setPosition({ x: dx, y: dy });

        if (onMove) {
            // Normalize to -1 to 1 based on actual movement vs radius
            onMove({ dx: dx / maxRadius, dy: dy / maxRadius });
        }
    }, [onMove]);

    const handleTouchEnd = () => {
        setActive(false);
        if (onActive) onActive(false);
        setPosition({ x: 0, y: 0 });
        if (onMove) {
            onMove({ dx: 0, dy: 0 });
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-16 h-16 rounded-full border-[3px] bg-black/40 shadow-[inset_0_0_15px_black] flex items-center justify-center transition-colors duration-200`}
            style={{
                borderColor: active ? color : `${color}80`,
                boxShadow: `0 0 20px ${color}66, inset 0 0 15px black`
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            <div
                className="absolute w-8 h-8 rounded-full bg-black/60 border shadow-lg"
                style={{
                    borderColor: `${color}cc`,
                    boxShadow: `0 0 15px ${color}99`,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: active ? 'none' : 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            ></div>
        </div>
    );
}
