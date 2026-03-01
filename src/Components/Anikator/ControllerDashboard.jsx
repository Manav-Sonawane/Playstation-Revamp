import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrthographicCamera } from '@react-three/drei';
import { useDualSenseWS } from './useDualSenseWS';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

// Simple 3D Controller purely for the Showcase
const ShowcaseController = ({ action }) => {
    const { nodes } = useGLTF('/ps5_controller.glb');
    const actionGroup = useRef();
    const floatGroup = useRef();

    useEffect(() => {
        if (!actionGroup.current) return;

        gsap.killTweensOf(actionGroup.current.rotation);
        gsap.killTweensOf(actionGroup.current.position);
        gsap.killTweensOf(actionGroup.current.scale);

        // If a button was released, animate smoothly back to origin
        if (action === 'RELEASE' || !action) {
            gsap.to(actionGroup.current.rotation, { x: 0, y: 0, z: 0, duration: 0.5, ease: "power2.out" });
            gsap.to(actionGroup.current.position, { x: 0, y: 0, z: 0, duration: 0.5, ease: "power2.out" });
            return;
        }

        if (action === 'DPAD_LEFT' || action === 'SQUARE') {
            gsap.to(actionGroup.current.rotation, { z: 0.2, y: -0.1, duration: 0.2, ease: "power1.out" });
            gsap.to(actionGroup.current.position, { x: -0.15, duration: 0.2, ease: "power1.out" });
        } else if (action === 'DPAD_RIGHT' || action === 'CIRCLE') {
            gsap.to(actionGroup.current.rotation, { z: -0.2, y: 0.1, duration: 0.2, ease: "power1.out" });
            gsap.to(actionGroup.current.position, { x: 0.15, duration: 0.2, ease: "power1.out" });
        } else if (action === 'DPAD_UP' || action === 'TRIANGLE') { // Forward / Up
            gsap.to(actionGroup.current.rotation, { x: 0.2, duration: 0.2, ease: "power1.out" });
            gsap.to(actionGroup.current.position, { z: 0.2, duration: 0.2, ease: "power1.out" });
        } else if (action === 'DPAD_DOWN' || action === 'CROSS') { // Down
            gsap.to(actionGroup.current.rotation, { x: -0.2, duration: 0.2, ease: "power1.out" });
            gsap.to(actionGroup.current.position, { z: -0.2, duration: 0.2, ease: "power1.out" });
        } else if (action === 'L_TRIGGER') { // Tilt Up and Left
            gsap.to(actionGroup.current.rotation, { x: 0.2, z: 0.15, duration: 0.2, ease: "power1.out" });
            gsap.to(actionGroup.current.position, { y: 0.15, x: -0.1, duration: 0.2, ease: "power1.out" });
        } else if (action === 'R_TRIGGER') { // Tilt Up and Right
            gsap.to(actionGroup.current.rotation, { x: 0.2, z: -0.15, duration: 0.2, ease: "power1.out" });
            gsap.to(actionGroup.current.position, { y: 0.15, x: 0.1, duration: 0.2, ease: "power1.out" });
        }
    }, [action]);

    useFrame((state) => {
        if (floatGroup.current) {
            floatGroup.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
            floatGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
        }
    });

    return (
        <group ref={floatGroup} scale={[3, 3, 3]}>
            <group ref={actionGroup} dispose={null}>
                {nodes.Scene && <primitive object={nodes.Scene} />}
                {!nodes.Scene && Object.keys(nodes).map(key => {
                    const node = nodes[key];
                    if (node.isMesh) return <mesh key={key} geometry={node.geometry} material={node.material} />
                    return null;
                })}
            </group>
        </group>
    );
};

export default function ControllerDashboard() {
    const { action } = useDualSenseWS();
    const bgRef = useRef(null);
    const textRef = useRef(null);

    // Blast background visual effect
    useEffect(() => {
        if (!action) return;

        // Reset color
        gsap.killTweensOf(bgRef.current);
        gsap.killTweensOf(textRef.current);

        let directionParams = { background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)' };
        let glowColor = 'rgba(0,0,0,0)';

        // Left controls (Red)
        if (['DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_DOWN', 'L_TRIGGER'].includes(action)) {
            glowColor = 'rgba(255, 0, 85, 0.5)';
            if (action === 'DPAD_LEFT') directionParams = { background: `radial-gradient(circle at 0% 50%, ${glowColor} 0%, transparent 60%)` };
            if (action === 'DPAD_RIGHT') directionParams = { background: `radial-gradient(circle at 100% 50%, ${glowColor} 0%, transparent 60%)` }; // Technically right side of the Dpad but keeping context left
            if (action === 'DPAD_UP' || action === 'L_TRIGGER') directionParams = { background: `radial-gradient(circle at 0% 0%, ${glowColor} 0%, transparent 60%)` };
            if (action === 'DPAD_DOWN') directionParams = { background: `radial-gradient(circle at 0% 100%, ${glowColor} 0%, transparent 60%)` };
            if (action === 'DPAD_RIGHT') directionParams = { background: `radial-gradient(circle at 30% 50%, ${glowColor} 0%, transparent 60%)` };
        }
        // Right controls (Blue)
        else if (['SQUARE', 'CIRCLE', 'TRIANGLE', 'CROSS', 'R_TRIGGER'].includes(action)) {
            glowColor = 'rgba(0, 150, 255, 0.5)';
            if (action === 'SQUARE') directionParams = { background: `radial-gradient(circle at 70% 50%, ${glowColor} 0%, transparent 60%)` };
            if (action === 'CIRCLE') directionParams = { background: `radial-gradient(circle at 100% 50%, ${glowColor} 0%, transparent 60%)` };
            if (action === 'TRIANGLE' || action === 'R_TRIGGER') directionParams = { background: `radial-gradient(circle at 100% 0%, ${glowColor} 0%, transparent 60%)` };
            if (action === 'CROSS') directionParams = { background: `radial-gradient(circle at 100% 100%, ${glowColor} 0%, transparent 60%)` };
        }

        gsap.fromTo(bgRef.current,
            { opacity: 1, ...directionParams },
            { opacity: 0, duration: 0.6, ease: "power2.out" }
        );

        // Pop text
        gsap.fromTo(textRef.current,
            { scale: 1.2, opacity: 1, textShadow: `0px 0px 30px ${glowColor.replace('0.5', '1')}` },
            { scale: 1, opacity: 0.3, textShadow: '0px 0px 0px rgba(0,0,0,0)', duration: 0.7 }
        );

    }, [action]);

    return (
        <div className="relative w-screen h-screen bg-[#0a0f16] overflow-hidden flex flex-col items-center justify-center">

            {/* Background flash layer */}
            <div ref={bgRef} className="absolute inset-0 pointer-events-none opacity-0 mix-blend-screen mix-blend-lighten"></div>

            {/* Giant 3D Canvas in center */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas>
                    <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={120} />
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={1.5} />
                    <spotLight position={[-10, -10, -10]} angle={0.25} penumbra={1} intensity={0.5} />
                    <Environment preset="studio" />
                    <ShowcaseController action={action} />
                </Canvas>
            </div>

            {/* Text UI */}
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-between py-[120px] px-12">
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase opacity-20 select-none pointer-events-none">
                    DUALSENSE EXPERIENCE
                </h1>

                <h2 ref={textRef} className="text-8xl font-black text-white tracking-widest opacity-30 select-none pointer-events-none transition-colors duration-100">
                    {action ? action.replace('_', ' ') : "AWAITING INPUT"}
                </h2>

                <p className="text-white font-bold text-lg uppercase tracking-widest opacity-40 select-none pointer-events-none">
                    Connect Phone to navigate
                </p>
            </div>

            {/* UI guidelines just to look cool */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5"></div>
            </div>
        </div>
    );
}
