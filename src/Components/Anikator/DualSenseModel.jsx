import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export const DualSenseModel = forwardRef(({ action }, ref) => {
    const { nodes, materials } = useGLTF('/ps5_controller.glb');
    const floatGroup = useRef();
    const actionGroup = useRef();

    useEffect(() => {
        if (!action || !actionGroup.current) return;

        // Kill any ongoing tweens so rapid inputs don't stack and drift
        gsap.killTweensOf(actionGroup.current.rotation);
        gsap.killTweensOf(actionGroup.current.position);
        gsap.killTweensOf(actionGroup.current.scale);

        if (action === 'LEFT') {
            gsap.fromTo(actionGroup.current.rotation, { z: 0, y: 0 }, { z: 0.5, y: -0.2, duration: 0.1, yoyo: true, repeat: 1 });
            gsap.fromTo(actionGroup.current.position, { x: 0 }, { x: -0.2, duration: 0.1, yoyo: true, repeat: 1 });
        } else if (action === 'RIGHT') {
            gsap.fromTo(actionGroup.current.rotation, { z: 0, y: 0 }, { z: -0.5, y: 0.2, duration: 0.1, yoyo: true, repeat: 1 });
            gsap.fromTo(actionGroup.current.position, { x: 0 }, { x: 0.2, duration: 0.1, yoyo: true, repeat: 1 });
        } else if (action === 'SELECT') {
            gsap.fromTo(actionGroup.current.position, { y: 0 }, { y: -0.2, duration: 0.1, yoyo: true, repeat: 1 });
            gsap.fromTo(actionGroup.current.scale, { x: 1, y: 1, z: 1 }, { x: 0.9, y: 0.9, z: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
        }
    }, [action]);

    // Gentle float animation when idle
    useFrame((state) => {
        if (floatGroup.current) {
            // Normal floating handles its own separate group so it never fights with GSAP
            floatGroup.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
            floatGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={floatGroup} scale={[1.5, 1.5, 1.5]}>
            <group ref={actionGroup} dispose={null}>
                {/* We apply primitive. Using the whole scene if available, or nodes if specific. */}
                {/* GLTF format varies, but normally rendering nodes.Scene works best. */}
                {nodes.Scene && <primitive object={nodes.Scene} />}
                {!nodes.Scene && Object.keys(nodes).map(key => {
                    const node = nodes[key];
                    if (node.isMesh) {
                        return <mesh key={key} geometry={node.geometry} material={node.material} />
                    }
                    return null;
                })}
            </group>
        </group>
    );
});

useGLTF.preload('/ps5_controller.glb');
