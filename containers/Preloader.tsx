"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Preloader(): React.ReactNode {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-center fixed z-20 inset-0 bg-background ${
        done ? "relative hidden" : "z-0"
      }`}
    >
      <Image
        src="/next-scene-logo.png"
        alt="Brand Image"
        width={400}
        height={400}
        className="animate-fadeInZoom"
      />
    </div>
  );
}
