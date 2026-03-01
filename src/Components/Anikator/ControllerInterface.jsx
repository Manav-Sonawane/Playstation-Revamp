import React, { useState, useEffect } from 'react';
import { useDualSenseWS } from './useDualSenseWS';
import { Joystick } from './Joystick';

export default function ControllerInterface() {
    const { sendAction, sendJoystick } = useDualSenseWS();
    const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);
        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    const handleRelease = (side) => {
        if (side === 'left') setLeftActive(false);
        if (side === 'right') setRightActive(false);
        sendAction('RELEASE');
    };

    const handlePress = (action, side) => {
        if (side === 'left') setLeftActive(true);
        if (side === 'right') setRightActive(true);

        // Aggressively attempt to vibrate phone
        try {
            if ('vibrate' in navigator || 'vibrate' in window.navigator) {
                const vibCore = navigator.vibrate || window.navigator.vibrate;
                if (action === 'LEFT' || action === 'RIGHT') {
                    // Array format is often better supported on older Androids
                    vibCore.call(navigator, [80]);
                } else if (action === 'SELECT') {
                    vibCore.call(navigator, [100, 50, 100]);
                } else {
                    vibCore.call(navigator, [40]);
                }
            }
        } catch (e) {
            console.log("Vibration API failed:", e);
        }

        // Send action to desktop
        sendAction(action);
    };

    return (
        <div className="relative w-[100vw] h-[100dvh] bg-[#0a0f16] overflow-hidden select-none touch-none">
            {/* Dynamic Background Glows */}
            <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${leftActive ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'radial-gradient(circle at 10% 50%, rgba(255, 0, 85, 0.4) 0%, transparent 50%)' }}></div>
            <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${rightActive ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'radial-gradient(circle at 90% 50%, rgba(0, 150, 255, 0.4) 0%, transparent 50%)' }}></div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />

            {/* Rotate Phone Screen Message */}
            {isPortrait && (
                <div className="absolute inset-0 z-50 bg-[#1a1f2e] text-white flex flex-col items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 animate-pulse"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                    <p className="text-xl font-semibold">Please rotate phone to landscape</p>
                </div>
            )}

            {/* Main Layout Landscape */}
            <div className={`absolute inset-0 p-4 pb-8 flex justify-between items-stretch ${isPortrait ? 'hidden' : 'flex'} pointer-events-none`}>

                {/* Left triggers & D-pad */}
                <div className="flex flex-col justify-between w-1/3 h-full pointer-events-auto relative">
                    {/* L1 / L2 */}
                    <div className="flex space-x-2 pl-4 pt-2">
                        <button onTouchStart={() => handlePress('L_TRIGGER', 'left')} onTouchEnd={() => handleRelease('left')} className="w-16 h-10 border border-white/50 rounded-full text-white/80 font-bold active:bg-[#ff0055]/40 active:border-[#ff0055] active:text-white active:scale-95 bg-black/40 backdrop-blur-md flex items-center justify-center z-10 shadow-lg select-none outline-none transition-all">L2</button>
                        <button onTouchStart={() => handlePress('L_TRIGGER', 'left')} onTouchEnd={() => handleRelease('left')} className="w-16 h-10 border border-white/50 rounded-full text-white/80 font-bold active:bg-[#ff0055]/40 active:border-[#ff0055] active:text-white active:scale-95 bg-black/40 backdrop-blur-md flex items-center justify-center mt-6 z-10 shadow-lg select-none outline-none transition-all">L1</button>
                    </div>

                    {/* D-Pad */}
                    <div className="relative w-36 h-36 ml-6 mb-4 mt-auto">
                        <button className="absolute top-0 left-12 w-12 h-12 bg-black/50 backdrop-blur-md rounded-t-lg border-t border-l border-r border-white/30 flex items-center justify-center text-white active:bg-[#ff0055]/40 active:border-[#ff0055] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none select-none transition-all" onTouchStart={() => handlePress('DPAD_UP', 'left')} onTouchEnd={() => handleRelease('left')}>▲</button>
                        <button className="absolute bottom-0 left-12 w-12 h-12 bg-black/50 backdrop-blur-md rounded-b-lg border-b border-l border-r border-white/30 flex items-center justify-center text-white active:bg-[#ff0055]/40 active:border-[#ff0055] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none select-none transition-all" onTouchStart={() => handlePress('DPAD_DOWN', 'left')} onTouchEnd={() => handleRelease('left')}>▼</button>
                        <button className="absolute top-12 left-0 w-12 h-12 bg-black/50 backdrop-blur-md rounded-l-lg border-l border-t border-b border-white/30 flex items-center justify-center text-white active:bg-[#ff0055]/40 active:border-[#ff0055] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none select-none transition-all" onTouchStart={() => handlePress('DPAD_LEFT', 'left')} onTouchEnd={() => handleRelease('left')}>◀</button>
                        <button className="absolute top-12 right-0 w-12 h-12 bg-black/50 backdrop-blur-md rounded-r-lg border-r border-t border-b border-white/30 flex items-center justify-center text-white active:bg-[#ff0055]/40 active:border-[#ff0055] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none select-none transition-all" onTouchStart={() => handlePress('DPAD_RIGHT', 'left')} onTouchEnd={() => handleRelease('left')}>▶</button>

                        <div className="absolute top-12 left-12 w-12 h-12 bg-black/60 shadow-inner"></div>
                    </div>
                </div>

                {/* Center Sticks */}
                <div className="flex flex-col justify-end items-center w-1/3 h-full mb-8 pointer-events-auto z-10">
                    <div className="flex space-x-16">
                        <Joystick onMove={(data) => sendJoystick(data)} color="#ff0055" onActive={(act) => setLeftActive(act)} />
                        <Joystick onMove={(data) => sendJoystick(data)} color="#0096ff" onActive={(act) => setRightActive(act)} />
                    </div>
                </div>

                {/* Right triggers & Action Buttons */}
                <div className="flex flex-col justify-between items-end w-1/3 h-full pointer-events-auto relative">
                    {/* R1 / R2 */}
                    <div className="flex space-x-2 pr-4 pt-2">
                        <button onTouchStart={() => handlePress('R_TRIGGER', 'right')} onTouchEnd={() => handleRelease('right')} className="w-16 h-10 border border-white/50 rounded-full text-white/80 font-bold active:bg-[#0096ff]/40 active:border-[#0096ff] active:text-white active:scale-95 bg-black/40 backdrop-blur-md flex items-center justify-center mt-6 z-10 shadow-lg outline-none select-none transition-all">R1</button>
                        <button onTouchStart={() => handlePress('R_TRIGGER', 'right')} onTouchEnd={() => handleRelease('right')} className="w-16 h-10 border border-white/50 rounded-full text-white/80 font-bold active:bg-[#0096ff]/40 active:border-[#0096ff] active:text-white active:scale-95 bg-black/40 backdrop-blur-md flex items-center justify-center z-10 shadow-lg outline-none select-none transition-all">R2</button>
                    </div>

                    {/* Action Buttons */}
                    <div className="relative w-40 h-40 mr-4 mb-2 mt-auto">
                        {/* Triangle (UP) */}
                        <button onTouchStart={() => handlePress('TRIANGLE', 'right')} onTouchEnd={() => handleRelease('right')} className="absolute top-0 left-12 w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-[#00E5FF] active:bg-[#00E5FF]/30 active:border-[#00E5FF] active:scale-90 text-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] outline-none select-none transition-all">△</button>
                        {/* Cross (DOWN) */}
                        <button onTouchStart={() => handlePress('CROSS', 'right')} onTouchEnd={() => handleRelease('right')} className="absolute bottom-0 left-12 w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-[#448AFF] active:bg-[#448AFF]/30 active:border-[#448AFF] active:scale-90 text-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] outline-none select-none transition-all">✕</button>
                        {/* Square (LEFT) */}
                        <button onTouchStart={() => handlePress('SQUARE', 'right')} onTouchEnd={() => handleRelease('right')} className="absolute top-12 left-0 w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-[#FF5252] active:bg-[#FF5252]/30 active:border-[#FF5252] active:scale-90 text-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] outline-none select-none transition-all">□</button>
                        {/* Circle (RIGHT) */}
                        <button onTouchStart={() => handlePress('CIRCLE', 'right')} onTouchEnd={() => handleRelease('right')} className="absolute top-12 right-0 w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-[#69F0AE] active:bg-[#69F0AE]/30 active:border-[#69F0AE] active:scale-90 text-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] outline-none select-none transition-all">○</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
