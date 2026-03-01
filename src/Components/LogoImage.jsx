import React, { useEffect, useRef, useState } from "react";

/**
 * LogoImage — renders a game logo with its background removed.
 *
 * Works for:
 *  • Logos on pure/near-black backgrounds  (COD, Kena)   → strips dark pixels
 *  • Logos already transparent (Moving Out)              → renders as-is
 *
 * Uses an off-screen Canvas to read pixel data and set the alpha channel of
 * any pixel whose luminance is below the threshold to 0 (transparent).
 * This approach is immune to stacking context / CSS blend-mode limitations.
 */
const LogoImage = ({ src, alt, style = {}, threshold = 60 }) => {
    const canvasRef = useRef(null);
    const [dataUrl, setDataUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        if (!src) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Sample the 4 corners to detect background colour
                // We'll use those pixels as the "background reference" colour
                const sampleCorners = [
                    [data[0], data[1], data[2]],                          // top-left
                    [data[(canvas.width - 1) * 4], data[(canvas.width - 1) * 4 + 1], data[(canvas.width - 1) * 4 + 2]], // top-right
                    [data[(canvas.height - 1) * canvas.width * 4], data[(canvas.height - 1) * canvas.width * 4 + 1], data[(canvas.height - 1) * canvas.width * 4 + 2]], // bottom-left
                ];

                // Average corner luminance — if low, we have a dark background to remove
                const avgLuma = sampleCorners.reduce((sum, [r, g, b]) => sum + (0.299 * r + 0.587 * g + 0.114 * b), 0) / sampleCorners.length;

                // Only strip if the corners are dark (background is dark/black)
                if (avgLuma < 80) {
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        // Luminance of this pixel
                        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
                        if (luma < threshold) {
                            // Make it transparent, proportional to darkness for smooth edges
                            data[i + 3] = Math.round((luma / threshold) * 255) * (luma / threshold);
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                }

                setDataUrl(canvas.toDataURL("image/png"));
            } catch (e) {
                // CORS or tainted canvas — fall back to original src
                setDataUrl(src);
            }
            setIsProcessing(false);
        };

        img.onerror = () => {
            setDataUrl(src);
            setIsProcessing(false);
        };

        img.src = src;
    }, [src, threshold]);

    if (isProcessing || !dataUrl) {
        // Placeholder while processing — same size, invisible
        return (
            <div
                style={{
                    ...style,
                    background: "transparent",
                    minWidth: style.maxWidth || "60px",
                    minHeight: style.maxHeight || "30px",
                }}
            />
        );
    }

    return (
        <img
            src={dataUrl}
            alt={alt}
            style={{
                ...style,
                background: "transparent",
            }}
        />
    );
};

export default LogoImage;
