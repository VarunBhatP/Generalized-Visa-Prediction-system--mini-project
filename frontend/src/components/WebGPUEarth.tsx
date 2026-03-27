"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import {
  step,
  normalWorldGeometry,
  output,
  texture,
  vec3,
  vec4,
  normalize,
  positionWorld,
  bumpMap,
  cameraPosition,
  color,
  uniform,
  mix,
  uv,
  max,
} from "three/tsl";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface WebGPUEarthProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function WebGPUEarth({ className = "", width = "100%", height = "100%" }: WebGPUEarthProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let globe: any;
    let renderer: any;
    let controls: any;
    const timer = new THREE.Timer();

    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
    camera.position.set(4.5, 2, 3);

    // Scene
    const scene = new THREE.Scene();

    // Sun
    const sun = new THREE.DirectionalLight("#ffffff", 2);
    sun.position.set(0, 0, 3);
    scene.add(sun);

    // Uniforms
    const atmosphereDayColor = uniform(color("#4db2ff"));
    const atmosphereTwilightColor = uniform(color("#bc490b"));
    const roughnessLow = uniform(0.25);
    const roughnessHigh = uniform(0.35);

    // Textures
    const textureLoader = new THREE.TextureLoader();

    const dayTexture = textureLoader.load("/textures/planets/earth_day_4096.jpg");
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.anisotropy = 8;

    const nightTexture = textureLoader.load("/textures/planets/earth_night_4096.jpg");
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = 8;

    const bumpRoughnessCloudsTexture = textureLoader.load("/textures/planets/earth_bump_roughness_clouds_4096.jpg");
    bumpRoughnessCloudsTexture.anisotropy = 8;

    // Fresnel
    const viewDirection = positionWorld.sub(cameraPosition).normalize();
    const fresnel = viewDirection.dot(normalWorldGeometry).abs().oneMinus().toVar();

    // Sun orientation
    const sunOrientation = normalWorldGeometry.dot(normalize(sun.position)).toVar();

    // Atmosphere color
    const atmosphereColor = mix(atmosphereTwilightColor, atmosphereDayColor, sunOrientation.smoothstep(-0.25, 0.75));

    // Globe Material
    const globeMaterial = new THREE.MeshStandardNodeMaterial();

    const cloudsStrength = texture(bumpRoughnessCloudsTexture, uv()).b.smoothstep(0.2, 1);
    globeMaterial.colorNode = mix(texture(dayTexture), vec3(1), cloudsStrength.mul(2));

    const roughness = max(texture(bumpRoughnessCloudsTexture).g, step(0.01, cloudsStrength));
    globeMaterial.roughnessNode = roughness.remap(0, 1, roughnessLow, roughnessHigh);

    const night = texture(nightTexture);
    const dayStrength = sunOrientation.smoothstep(-0.25, 0.5);

    const atmosphereDayStrength = sunOrientation.smoothstep(-0.5, 1);
    const atmosphereMix = atmosphereDayStrength.mul(fresnel.pow(2)).clamp(0, 1);

    let finalOutput = mix(night.rgb, output.rgb, dayStrength);
    finalOutput = mix(finalOutput, atmosphereColor, atmosphereMix);

    globeMaterial.outputNode = vec4(finalOutput, output.a);

    const bumpElevation = max(texture(bumpRoughnessCloudsTexture).r, cloudsStrength);
    globeMaterial.normalNode = bumpMap(bumpElevation);

    // Geometry
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    globe = new THREE.Mesh(sphereGeometry, globeMaterial);
    scene.add(globe);

    // Atmosphere
    const atmosphereMaterial = new THREE.MeshBasicNodeMaterial({ side: THREE.BackSide, transparent: true });
    let alpha = fresnel.remap(0.73, 1, 1, 0).pow(3);
    alpha = alpha.mul(sunOrientation.smoothstep(-0.5, 1));
    atmosphereMaterial.outputNode = vec4(atmosphereColor, alpha);

    const atmosphere = new THREE.Mesh(sphereGeometry, atmosphereMaterial);
    atmosphere.scale.setScalar(1.04);
    scene.add(atmosphere);

    // Renderer
    try {
        renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        
        // Remove existing canvas if React re-rendered
        while (currentMount.firstChild) {
            currentMount.removeChild(currentMount.firstChild);
        }
        currentMount.appendChild(renderer.domElement);
    } catch (e) {
        console.error("WebGPU is likely not supported by your browser.", e);
        return;
    }

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 0.1;
    controls.maxDistance = 50;

    // Resize handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (!currentMount) return;
        const w = entry.contentRect.width || currentMount.clientWidth;
        const h = entry.contentRect.height || currentMount.clientHeight;
        if (w === 0 || h === 0) continue;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    });
    
    // Ensuring the canvas CSS fits the container without stretching it
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.objectFit = "cover";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "auto";

    resizeObserver.observe(currentMount);

    timer.connect(document);

    // Animation Loop
    const animate = () => {
      timer.update();
      const delta = timer.getDelta();
      
      globe.rotation.y += delta * 0.025;
      controls.update();
      
      try {
        renderer.render(scene, camera);
      } catch (err) {
        console.error(err);
      }
    };
    renderer.setAnimationLoop(animate);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      renderer.setAnimationLoop(null);
      if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      try { renderer.dispose(); } catch (e) {}
      try { globeMaterial.dispose(); } catch (e) {}
      try { atmosphereMaterial.dispose(); } catch (e) {}
      try { sphereGeometry.dispose(); } catch (e) {}
      try { dayTexture.dispose(); } catch (e) {}
      try { nightTexture.dispose(); } catch (e) {}
      try { bumpRoughnessCloudsTexture.dispose(); } catch (e) {}
      try { timer.dispose(); } catch (e) {}
      try { controls.dispose(); } catch (e) {}
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width, height, position: "relative", minHeight: "300px" }}
    />
  );
}
