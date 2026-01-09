import React, { useRef, useState } from "react";
import withBg from "../assets/image_w_bg.png";
import withoutBg from "../assets/image_wo_bg.png";

const Third = () => {
  const containerRef = useRef(null);
  const [x, setX] = useState(50); // percentage

  const moveSlider = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setX(Math.max(0, Math.min(100, pos)));
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        Remove Background With High Quality and Accuracy
      </h2>

      <div
        ref={containerRef}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-xl select-none"
        onMouseMove={(e) => e.buttons === 1 && moveSlider(e.clientX)}
        onMouseDown={(e) => moveSlider(e.clientX)}
      >
        {/* Bottom image (with bg) */}
        <img
          src={withBg}
          alt="with background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top image (no bg) – CLIPPED */}
        <img
          src={withoutBg}
          alt="without background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            clipPath: `inset(0 ${100 - x}% 0 0)`
          }}
        />

        {/* Divider */}
        <div
          className="absolute top-0 h-full w-[2px] bg-white z-20"
          style={{ left: `${x}%` }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-30
                     w-10 h-10 bg-white rounded-full shadow-md border
                     flex items-center justify-center cursor-ew-resize"
          style={{ left: `calc(${x}% - 20px)` }}
        >
          ↔
        </div>

        {/* Aspect ratio fix */}
        <div className="pt-[66%]" />
      </div>
    </section>
  );
};

export default Third;
