"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const ARC_REL_LEN = 0.2; // Shorter dashes like data packets
const FLIGHT_TIME = 3500; // Increased to make arcs travel slower

// Major global hubs for Visa travel
const HUBS = [
    { lat: 40.7128, lng: -74.0060 }, // New York
    { lat: 51.5074, lng: -0.1278 },  // London
    { lat: 28.6139, lng: 77.2090 },  // New Delhi
    { lat: -33.8688, lng: 151.2093 },// Sydney
    { lat: 35.6762, lng: 139.6503 }, // Tokyo
    { lat: 43.6532, lng: -79.3832 }, // Toronto
    { lat: 25.2048, lng: 55.2708 },  // Dubai
    { lat: 6.5244, lng: 3.3792 },    // Lagos
    { lat: -23.5505, lng: -46.6333 },// Sao Paulo
    { lat: 1.3521, lng: 103.8198 },  // Singapore
];

interface Arc {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string;
}

export default function InteractiveGlobe() {
    const globeRef = useRef<GlobeMethods>();
    const [arcsData, setArcsData] = useState<Arc[]>([]);

    // Generate autonomous traffic
    useEffect(() => {
        const interval = setInterval(() => {
            // Pick two random distinct hubs
            const startHub = HUBS[Math.floor(Math.random() * HUBS.length)];
            let endHub = HUBS[Math.floor(Math.random() * HUBS.length)];
            while (startHub === endHub) {
                endHub = HUBS[Math.floor(Math.random() * HUBS.length)];
            }

            // Alternate colors for variety (Red palette)
            const colors = ["#d41b06", "#960000", "#470202"];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            const arc = {
                startLat: startHub.lat,
                startLng: startHub.lng,
                endLat: endHub.lat,
                endLng: endHub.lng,
                color: randomColor
            };

            setArcsData((prev) => [...prev, arc]);

            // Clean up arc after flight
            setTimeout(() => {
                setArcsData((prev) => prev.filter((d) => d !== arc));
            }, FLIGHT_TIME * 2);

        }, 2000); // Trigger a new arc every 2 seconds (was 300ms)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let checkInterval: NodeJS.Timeout;

        const initControls = () => {
            if (globeRef.current) {
                const controls = globeRef.current.controls();
                if (controls) {
                    controls.autoRotate = true;
                    controls.autoRotateSpeed = 0.8; // Constant rotation
                    controls.enableZoom = false;
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.05;
                    controls.minPolarAngle = 0;
                    controls.maxPolarAngle = Math.PI;

                    globeRef.current.pointOfView({ altitude: 2.2 }); // Zoomed in a bit more
                    return true;
                }
            }
            return false;
        };

        // If controls not ready immediately, check every 200ms until they are.
        if (!initControls()) {
            checkInterval = setInterval(() => {
                if (initControls()) {
                    clearInterval(checkInterval);
                }
            }, 200);
        }

        return () => {
            if (checkInterval) clearInterval(checkInterval);
        };
    }, []);

    return (
        <div className="w-full h-[120vh] cursor-grab active:cursor-grabbing">
            <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundColor="rgba(0,0,0,0)"

                // Atmosphere styling
                atmosphereColor="#f3fdff" // White/Cyan glow (Fixed 6-digit hex)
                atmosphereAltitude={0.12} // Reduced from 0.15 for less neon glow

                // Arc styling
                arcsData={arcsData}
                arcColor={(d: unknown) => (d as Arc).color}
                arcDashLength={ARC_REL_LEN}
                arcDashGap={1.5}
                arcDashInitialGap={1}
                arcDashAnimateTime={FLIGHT_TIME}
                arcsTransitionDuration={0}
                arcStroke={0.5} // Slightly thicker lines
            />
        </div>
    );
}
