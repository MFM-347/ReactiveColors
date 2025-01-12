"use client";

import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Generator from "./components/Generator";
import Examples from "./components/Examples";
import PWABadge from "./PWABadge.tsx";
import { generateShade, prClr } from "./utils";

export default function App() {
  const [color, setColor] = useState(prClr);
  const [shades, setShades] = useState(generateShade(color));

  useEffect(() => {
    setShades(generateShade(color));
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <Generator
          color={color}
          onColorChange={handleColorChange}
          shades={shades}
        />
        <Examples shades={shades} />
      </main>
      <PWABadge />
    </div>
  );
}
