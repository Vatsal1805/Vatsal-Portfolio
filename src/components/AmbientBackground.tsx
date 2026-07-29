"use client";
import { useEffect, useRef } from "react";

export default function AmbientBackground({
  speedRef,
}: {
  speedRef: { current: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    // Track mouse positioning to sway perspective
    let mx = 0;
    let my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) - 0.5;
      my = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      // beta = pitch (-180 to 180), gamma = roll (-90 to 90)
      const pitch = Math.min(Math.max(e.beta - 45, -30), 30) / 30; // -1 to 1
      const roll = Math.min(Math.max(e.gamma, -30), 30) / 30;    // -1 to 1

      // Set sway offset
      mx = roll * 0.4;
      my = pitch * 0.4;
    };
    window.addEventListener("deviceorientation", onDeviceOrientation);

    type Vertex = { x: number; y: number; z: number };
    type Edge = [number, number];

    // Vertices for a 3D wireframe box
    const boxVertices: Vertex[] = [
      { x: -100, y: -60, z: -100 },
      { x: 100, y: -60, z: -100 },
      { x: 100, y: 60, z: -100 },
      { x: -100, y: 60, z: -100 },
      { x: -100, y: -60, z: 100 },
      { x: 100, y: -60, z: 100 },
      { x: 100, y: 60, z: 100 },
      { x: -100, y: 60, z: 100 },
    ];

    const boxEdges: Edge[] = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back
      [4, 5], [5, 6], [6, 7], [7, 4], // Front
      [0, 4], [1, 5], [2, 6], [3, 7], // Links
    ];

    type WireframeObject = {
      cx: number;
      cy: number;
      cz: number;
      vertices: Vertex[];
      edges: Edge[];
      scale: number;
      angleX: number;
      angleY: number;
      angleZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
    };

    // Instantiate 3 floating system wireframes at different depth layers
    const shapes: WireframeObject[] = [
      {
        cx: 0.15 * w,
        cy: -0.1 * h,
        cz: 0,
        vertices: boxVertices,
        edges: boxEdges,
        scale: 1.2,
        angleX: Math.random() * Math.PI,
        angleY: Math.random() * Math.PI,
        angleZ: 0,
        rotSpeedX: 0.0015,
        rotSpeedY: 0.0025,
      },
      {
        cx: -0.25 * w,
        cy: 0.18 * h,
        cz: 50,
        vertices: boxVertices,
        edges: boxEdges,
        scale: 0.75,
        angleX: Math.random() * Math.PI,
        angleY: Math.random() * Math.PI,
        angleZ: 0,
        rotSpeedX: -0.002,
        rotSpeedY: 0.0018,
      },
      {
        cx: 0.28 * w,
        cy: 0.25 * h,
        cz: -50,
        vertices: boxVertices,
        edges: boxEdges,
        scale: 0.6,
        angleX: Math.random() * Math.PI,
        angleY: Math.random() * Math.PI,
        angleZ: 0,
        rotSpeedX: 0.001,
        rotSpeedY: -0.003,
      },
    ];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      shapes[0].cx = 0.15 * w;
      shapes[0].cy = -0.1 * h;
      shapes[1].cx = -0.25 * w;
      shapes[1].cy = 0.18 * h;
      shapes[2].cx = 0.28 * w;
      shapes[2].cy = 0.25 * h;
    };
    window.addEventListener("resize", resize);

    const focalLength = 350;

    let raf = 0;
    const render = () => {
      // Clear background color
      ctx.fillStyle = "#0E0D0B";
      ctx.fillRect(0, 0, w, h);

      // Render Ambient warm backing glows for depth
      const centerGlow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
      centerGlow.addColorStop(0, "rgba(232, 121, 46, 0.05)");
      centerGlow.addColorStop(0.5, "rgba(216, 154, 58, 0.025)");
      centerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, Math.max(w, h) * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Read current dynamic scroll speed modifier
      const speedMult = speedRef.current;

      shapes.forEach((s) => {
        // Increment angles, scaled by scrolling velocity
        s.angleX += s.rotSpeedX * speedMult;
        s.angleY += s.rotSpeedY * speedMult;

        const sinX = Math.sin(s.angleX);
        const cosX = Math.cos(s.angleX);
        const sinY = Math.sin(s.angleY);
        const cosY = Math.cos(s.angleY);

        // Project 3D vertices to 2D screen coordinates
        const projected = s.vertices.map((v) => {
          // Local scale
          let x = v.x * s.scale;
          let y = v.y * s.scale;
          let z = v.z * s.scale;

          // Rotate X
          const y1 = y * cosX - z * sinX;
          const z1 = z * cosX + y * sinX;

          // Rotate Y
          const x2 = x * cosY - z1 * sinY;
          const z2 = z1 * cosY + x * sinY;

          // Add offset position in space (plus mouse sway)
          const rx = x2 + s.cx + (mx * 80);
          const ry = y1 + s.cy + (my * 60);
          const rz = z2 + s.cz;

          // Projection calculation
          const factor = focalLength / (focalLength + rz);
          return {
            x: rx * factor + w / 2,
            y: ry * factor + h / 2,
          };
        });

        // Draw structural wireframe lines
        ctx.strokeStyle = "rgba(232, 121, 46, 0.15)"; // Accent orange made more visible
        ctx.lineWidth = 1.0;
        ctx.beginPath();

        s.edges.forEach(([u, v]) => {
          const p1 = projected[u];
          const p2 = projected[v];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        });
        ctx.stroke();

        // Optional: Draw fine point markers on joints
        ctx.fillStyle = "rgba(232, 121, 46, 0.35)"; // Accent orange markers made more visible
        projected.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
    };
  }, [speedRef]);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden select-none pointer-events-none z-0">
      {/* 3D Blueprint Wireframe Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Subtle Mesh Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #A79C8E 1px, transparent 1px),
            linear-gradient(to bottom, #A79C8E 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Faint Tactile Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
