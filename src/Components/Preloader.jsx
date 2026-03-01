import React, { useState, useEffect } from "react";

const Preloader = ({ onComplete }) => {
    const [fading, setFading] = useState(false);

    useEffect(() => {
        // If you want a fallback timeout in case video fails to load/play
        const fallback = setTimeout(() => {
            handleComplete();
        }, 8000); // Max 8 seconds fallback
        return () => clearTimeout(fallback);
    }, []);

    const handleComplete = () => {
        setFading(true);
        setTimeout(() => {
            onComplete();
        }, 1000); // 1s fade duration
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "#000",
                zIndex: 99999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: fading ? 0 : 1,
                transition: "opacity 1s ease-in-out",
                pointerEvents: "auto", // Prevent interaction while showing
            }}
        >
            <video
                autoPlay
                muted
                playsInline
                onEnded={handleComplete}
                onError={handleComplete}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src="/preloader.mp4" // Expected to have a preloader.mp4 in the public/ folder
            >
                {/* Fallback content for the video if missing */}
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Preloader;
