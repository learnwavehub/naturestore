"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function BannerSlider() {
  const images = [
    "/banner1.png",
    "/banner2.png",
    "/newbanner3.png",
    "/newbanner4.png",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="
          relative w-full
          h-[380px]
          sm:h-[450px]
          md:h-[550px]
          lg:h-[650px]
          xl:h-[750px]
        "
      >
        {images.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Blurred Background */}
            <Image
              src={src}
              alt={`background-${i}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover blur-3xl scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 z-[1]" />

            {/* Main Banner */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-2 sm:p-4">
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`banner-${i}`}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="
                    object-contain
                    select-none
                  "
                />
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}