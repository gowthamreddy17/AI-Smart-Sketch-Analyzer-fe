"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

type WavyBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
};

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise = createNoise3D();

  const fixedCanvasHeight = 450;

  let w = 0,
    h = 0,
    nt = 0,
    ctx: CanvasRenderingContext2D | null = null;

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const drawWave = (n: number) => {
    nt += getSpeed();
    for (let i = 0; i < n; i++) {
      ctx?.beginPath();
      if (!ctx) return;

      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];

      for (let x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }

      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;

  const render = () => {
    if (!ctx) return;

    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = fixedCanvasHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;

    window.onresize = () => {
      if (!ctx) return;
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = fixedCanvasHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    render();
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-[450px] flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute top-0 left-0 w-full h-full z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};


// "use client";

// import { cn } from "@/lib/utils";
// import React, { useEffect, useRef, useState } from "react";
// import { createNoise3D } from "simplex-noise";

// type WavyBackgroundProps = {
//   children?: React.ReactNode;
//   className?: string;
//   containerClassName?: string;
//   colors?: string[];
//   waveWidth?: number;
//   backgroundFill?: string;
//   blur?: number;
//   speed?: "slow" | "fast";
//   waveOpacity?: number;
//   [key: string]: unknown;
// };

// export const WavyBackground = ({
//   children,
//   className,
//   containerClassName,
//   colors,
//   waveWidth,
//   backgroundFill,
//   blur = 10,
//   speed = "fast",
//   waveOpacity = 0.5,
//   ...props
// }: WavyBackgroundProps) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const noise = createNoise3D();

//   let w = 0,
//     h = 0,
//     nt = 0,
//     ctx: CanvasRenderingContext2D | null = null;

//   const getSpeed = () => {
//     return speed === "fast" ? 0.002 : 0.001;
//   };

//   const waveColors = colors ?? [
//     "#38bdf8",
//     "#818cf8",
//     "#c084fc",
//     "#e879f9",
//     "#22d3ee",
//   ];

//   const drawWave = (n: number) => {
//     nt += getSpeed();
//     for (let i = 0; i < n; i++) {
//       ctx?.beginPath();
//       if (!ctx) return;

//       ctx.lineWidth = waveWidth || 50;
//       ctx.strokeStyle = waveColors[i % waveColors.length];

//       for (let x = 0; x < w; x += 5) {
//         const y = noise(x / 800, 0.3 * i, nt) * 100;
//         ctx.lineTo(x, y + h * 0.5);
//       }

//       ctx.stroke();
//       ctx.closePath();
//     }
//   };

//   let animationId: number;

//   const render = () => {
//     if (!ctx) return;

//     ctx.fillStyle = backgroundFill || "black";
//     ctx.globalAlpha = waveOpacity;
//     ctx.fillRect(0, 0, w, h);
//     drawWave(5);
//     animationId = requestAnimationFrame(render);
//   };

//   const init = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     w = ctx.canvas.width = window.innerWidth;
//     // h = ctx.canvas.height = window.innerHeight;
//     h = ctx.canvas.height = window.innerHeight; 
//     ctx.filter = `blur(${blur}px)`;
//     nt = 0;

//     window.onresize = () => {
//       if (!ctx) return;
//       w = ctx.canvas.width = window.innerWidth;
//       h = ctx.canvas.height = window.innerHeight;
//       ctx.filter = `blur(${blur}px)`;
//     };

//     render();
//   };

//   useEffect(() => {
//     init();
//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // `init` is stable, `animationId` is safe to ignore since it's reassigned

//   const [isSafari, setIsSafari] = useState(false);

//   useEffect(() => {
//     setIsSafari(
//       typeof window !== "undefined" &&
//         navigator.userAgent.includes("Safari") &&
//         !navigator.userAgent.includes("Chrome")
//     );
//   }, []);

//   return (
//     <div
//       className={cn(
//         "h-screen flex flex-col items-center justify-center",
//         containerClassName
//       )}
//     >
//       <canvas
//         className="absolute inset-0 z-0"
//         ref={canvasRef}
//         id="canvas"
//         style={{
//           ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
//         }}
//       />
//       <div className={cn("relative z-10", className)} {...props}>
//         {children}
//       </div>
//     </div>
//   );
// };
