import React, { useEffect, useRef, useState } from 'react';
import { useDualSenseWS } from './useDualSenseWS';

/**
 * VirtualCursor — A global controller-driven cursor system.
 * Simulates mouse movements and clicks across the entire application.
 */
export default function VirtualCursor() {
    const { action, joystick } = useDualSenseWS();
    const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const lastHoverRef = useRef(null);
    const cursorRef = useRef(null);

    // Update internal ref for the animation loop
    useEffect(() => {
        posRef.current = pos;
    }, [pos]);

    // Sync native mouse position with virtual cursor
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update the absolute position when native mouse moves
            setPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Movement Loop
    useEffect(() => {
        let frameId;
        const speed = 12; // Adjusted for better responsiveness

        const loop = () => {
            if (joystick && (joystick.dx !== 0 || joystick.dy !== 0)) {
                const newX = Math.max(0, Math.min(window.innerWidth, posRef.current.x + joystick.dx * speed));
                const newY = Math.max(0, Math.min(window.innerHeight, posRef.current.y + joystick.dy * speed));

                if (newX !== posRef.current.x || newY !== posRef.current.y) {
                    setPos({ x: newX, y: newY });

                    // Trigger custom hover tracking
                    const element = document.elementFromPoint(newX, newY);
                    if (element !== lastHoverRef.current) {
                        if (lastHoverRef.current) lastHoverRef.current.classList.remove('controller-hover');
                        if (element) element.classList.add('controller-hover');
                        lastHoverRef.current = element;

                        // Dispatch mousemove for components listening to it
                        if (element) {
                            element.dispatchEvent(new MouseEvent('mousemove', {
                                bubbles: true,
                                clientX: newX,
                                clientY: newY
                            }));
                        }
                    }
                }
            }
            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameId);
    }, [joystick]);

    // Action (Click) Handling
    useEffect(() => {
        if (!action) return;

        const x = posRef.current.x;
        const y = posRef.current.y;
        const element = document.elementFromPoint(x, y);

        if (!element) return;

        if (action === 'CROSS') {
            // Simulate mousedown & click
            element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y }));
            element.click();

            // Visual feedback for click
            if (cursorRef.current) {
                cursorRef.current.style.transform += ' scale(0.8)';
            }
        } else if (action === 'RELEASE') {
            // Check if we need to dispatch mouseup
            element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: x, clientY: y }));
            if (cursorRef.current) {
                cursorRef.current.style.transform = cursorRef.current.style.transform.replace(' scale(0.8)', '');
            }
        }
    }, [action]);

    return (
        <>
            {/* Global Cursor Styles to support our simulation */}
            <style>
                {`
                    .controller-hover {
                        cursor: pointer !important;
                        filter: brightness(1.2) contrast(1.1) !important;
                        transition: all 0.2s ease !important;
                    }
                    button.controller-hover, a.controller-hover {
                        transform: scale(1.05) !important;
                        box-shadow: 0 0 20px rgba(0, 112, 209, 0.4) !important;
                    }
                `}
            </style>

            {/* The Visual Cursor */}
            <div
                ref={cursorRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "32px",
                    height: "32px",
                    zIndex: 9999,
                    pointerEvents: "none",
                    transform: `translate(${pos.x}px, ${pos.y}px) translate(-10%, -10%)`,
                    transition: "transform 0.05s linear",
                }}
            >
                <img
                    src="/astro_cursor.png"
                    alt="Controller Cursor"
                    style={{
                        width: "100%",
                        height: "100%",
                        filter: "drop-shadow(0 0 8px rgba(0, 112, 209, 0.8))"
                    }}
                />

                {/* Secondary trail/halo for better visibility */}
                <div style={{
                    position: "absolute",
                    inset: "-4px",
                    borderRadius: "50%",
                    border: "2px solid rgba(0, 112, 209, 0.3)",
                    animation: "psPulse 1.5s infinite",
                }} />
            </div>
        </>
    );
}
