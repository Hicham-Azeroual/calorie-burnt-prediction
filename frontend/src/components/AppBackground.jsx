// AppBackground.js
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "rgba(101, 116, 255, 0.8)",
      "rgba(185, 103, 255, 0.8)",
      "rgba(255, 107, 107, 0.8)",
      "rgba(255, 255, 255, 0.6)",
    ];

    let particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: [],
    }));

    let animation;

    function draw() {
      ctx.fillStyle = "rgba(10, 10, 20, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let p of particles) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        for (let i = 0; i < p.trail.length; i++) {
          const alpha = (i / p.trail.length) * 0.5;
          ctx.beginPath();
          ctx.arc(
            p.trail[i].x,
            p.trail[i].y,
            p.r * (0.5 + i / p.trail.length),
            0,
            2 * Math.PI
          );
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, alpha + ")");
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }

      animation = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

function AppBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const xBlob1 = useTransform(mouseX, [0, 1], [-50, 50]);
  const yBlob1 = useTransform(mouseY, [0, 1], [-30, 30]);
  const xBlob2 = useTransform(mouseX, [0, 1], [30, -30]);
  const yBlob2 = useTransform(mouseY, [0, 1], [20, -20]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  };

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-gray-900"
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <ParticleField />

      <motion.svg
        className="absolute top-[10%] left-[10%] z-0 opacity-70"
        width="800"
        height="800"
        style={{ x: xBlob1, y: yBlob1 }}
      >
        <defs>
          <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6e45e2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="400" cy="400" rx="350" ry="350" fill="url(#blob1)" />
      </motion.svg>

      <motion.svg
        className="absolute bottom-[10%] right-[10%] z-0 opacity-70"
        width="800"
        height="800"
        style={{ x: xBlob2, y: yBlob2 }}
      >
        <defs>
          <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="400" cy="400" rx="350" ry="350" fill="url(#blob2)" />
      </motion.svg>

      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full z-0"
        animate={{
          background: [
            "radial-gradient(circle, rgba(101, 116, 255, 0.15) 0%, rgba(101, 116, 255, 0) 70%)",
            "radial-gradient(circle, rgba(185, 103, 255, 0.15) 0%, rgba(185, 103, 255, 0) 70%)",
            "radial-gradient(circle, rgba(101, 116, 255, 0.15) 0%, rgba(101, 116, 255, 0) 70%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default AppBackground;
