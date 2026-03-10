"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function HeroGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;
        let globe: ReturnType<typeof createGlobe> | null = null;

        if (canvasRef.current) {
            globe = createGlobe(canvasRef.current, {
                devicePixelRatio: 2,
                width: 1000,
                height: 1000,
                phi: 0,
                theta: 0.3,
                dark: 1,
                diffuse: 1.2,
                mapSamples: 16000,
                mapBrightness: 6,
                baseColor: [0.043, 0.059, 0.098],
                markerColor: [0.024, 0.714, 0.831],
                glowColor: [0.024, 0.714, 0.831],
                markers: [
                    { location: [37.7595, -122.4367], size: 0.03 },
                    { location: [40.7128, -74.006], size: 0.1 },
                    { location: [51.5074, -0.1278], size: 0.06 },
                    { location: [28.6139, 77.209], size: 0.08 },
                    { location: [-33.8688, 151.2093], size: 0.05 },
                ],
                onRender: (state) => {
                    state.phi = phi;
                    phi += 0.005;
                },
            });
        }

        return () => {
            if (globe) {
                globe.destroy();
            }
        };
    }, []);

    return (
        <div className="w-full max-w-[600px] aspect-square mx-auto relative flex items-center justify-center">
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%", contain: "layout paint size" }}
            />
        </div>
    );
}
