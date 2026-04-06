"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function BannerSlider() {
  const images = [
    "/mibanner.jpg",
    "/banner1.jpg",
    "/banner44.jpg",
    "/banner55.jpg",
     "/banner66.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[250px] xs:h-[280px] sm:h-[350px] md:h-[450px] lg:h-[600px] overflow-hidden">

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
            alt={`bg-${i}`}
            fill
            className="object-cover blur-2xl scale-110"
            priority={i === 0}
          />

          {/* Real Image - flex centering to remove spaces */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full h-full max-h-full">
              <Image
                src={src}
                alt={`banner-${i}`}
                fill
                className="object-contain sm:object-cover z-10"
                priority={i === 0}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}