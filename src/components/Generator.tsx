"use client";

import { useState, useEffect } from "react";
import { RefreshCcw, Copy, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import tinycolor from "tinycolor2";
import { isDark } from "../utils";
import Saved from "./Saved";

interface Shade {
  [key: string]: string;
}

interface Palette {
  color: string;
  shades: Shade;
  name: string;
}

interface GeneratorProps {
  color: string;
  shades: Shade;
  onColorChange: (color: string) => void;
}

export default function Generator({
  color,
  shades,
  onColorChange,
}: GeneratorProps) {
  const { toast } = useToast();
  const [savedPalettes, setSavedPalettes] = useState<Palette[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => e.code === "Space" && random();
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("palettes") || "[]",
    ) as Palette[];
    setSavedPalettes(saved);
  }, []);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    onColorChange(newColor);
  };

  const random = () => {
    const randColor = tinycolor.random().toHexString();
    onColorChange(randColor);
  };

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast({
      description: `Copied ${hex}`,
    });
  };

  const copyAll = (shades: Shade) => {
    const shadeKeys = Object.keys(shades);
    const shadeCode = {
      color: {
        "50": shades[shadeKeys[0]],
        "100": shades[shadeKeys[1]],
        "200": shades[shadeKeys[2]],
        "300": shades[shadeKeys[3]],
        "400": shades[shadeKeys[4]],
        "500": shades[shadeKeys[5]],
        "600": shades[shadeKeys[6]],
        "700": shades[shadeKeys[7]],
        "800": shades[shadeKeys[8]],
        "900": shades[shadeKeys[9]],
        "950": shades[shadeKeys[10]],
      },
    };
    const shadeCodeString = JSON.stringify(shadeCode, null, 2);
    navigator.clipboard
      .writeText(shadeCodeString)
      .then(() => toast({ description: "All shades copied!" }))
      .catch(() => toast({ description: "Failed to copy shades" }));
  };

  const savePalette = () => {
    if (savedPalettes.some((palette) => palette.color === color)) {
      toast({ description: "This palette is already saved!" });
      return;
    }
    const newPalette: Palette = {
      color,
      shades,
      name: `Palette ${savedPalettes.length + 1}`,
    };
    const updatedPalettes = [...savedPalettes, newPalette];
    setSavedPalettes(updatedPalettes);
    localStorage.setItem("palettes", JSON.stringify(updatedPalettes));
    toast({ description: "Palette saved!" });
  };

  const deletePalette = (index: number) => {
    const updatedPalettes = savedPalettes.filter((_, i) => i !== index);
    setSavedPalettes(updatedPalettes);
    localStorage.setItem("palettes", JSON.stringify(updatedPalettes));
    toast({ description: "Palette deleted!" });
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-2">TW Shade Generator</h1>
      <p className="text-muted-foreground mb-4">
        Press spacebar for random colors or enter a hex code to generate shades
      </p>
      <div className="flex justify-center items-center gap-4 my-4">
        <div
          className="w-8 h-8 rounded-full border-2 border-border"
          style={{ backgroundColor: color }}
        />
        <Input value={color} onChange={update} className="w-full max-w-xs" />
        <Button size="icon" variant="outline" onClick={random}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {Object.entries(shades).map(([key, shade]) => (
          <div
            key={key}
            className="py-12 px-8 rounded-md text-lg font-normal transition-transform hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: shade,
              color: isDark(shade) ? "white" : "black",
              border: "1px solid " + (isDark(shade) ? "white" : "black"),
            }}
            onClick={() => copy(shade)}
          >
            <div className="font-semibold">{key}</div>
            <div>{shade}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => copyAll(shades)}>
          <Copy className="mr-2 h-4 w-4" /> Copy All
        </Button>
        <Button onClick={savePalette}>
          <Save className="mr-2 h-4 w-4" /> Save Palette
        </Button>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button variant="secondary">Show Saved Palettes</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Saved Palettes</DialogTitle>
              <DialogDescription>Your saved color palettes</DialogDescription>
            </DialogHeader>
            <Saved
              savedPalettes={savedPalettes}
              onImportPalette={(palette: Palette) =>
                onColorChange(palette.color)
              }
              onDeletePalette={deletePalette}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
