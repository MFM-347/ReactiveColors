import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Saved({ savedPalettes, onImportPalette, onDeletePalette }) {
  return (
    <div className="mt-4">
      {savedPalettes.length > 0 ? (
        <ul className="space-y-2">
          {savedPalettes.map((palette, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 hover:bg-accent rounded-md cursor-pointer"
              onClick={() => onImportPalette(palette)}
            >
              <div>
                <div>{palette.name}</div>
                <div className="text-sm text-muted-foreground">{palette.color}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePalette(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No saved palettes yet.</p>
      )}
    </div>
  );
}
