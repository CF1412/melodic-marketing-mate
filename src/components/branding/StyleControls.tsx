
import { Palette, Image } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface StyleControlsProps {
  colorScheme: string;
  designStyle: string;
  onColorSchemeChange: (value: string) => void;
  onDesignStyleChange: (value: string) => void;
}

export function StyleControls({
  colorScheme,
  designStyle,
  onColorSchemeChange,
  onDesignStyleChange
}: StyleControlsProps) {
  return (
    <div className="flex gap-4">
      <Select value={colorScheme} onValueChange={onColorSchemeChange}>
        <SelectTrigger className="w-[140px]">
          <Palette className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Color Scheme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="modern">Modern & Clean</SelectItem>
          <SelectItem value="vibrant">Vibrant & Bold</SelectItem>
          <SelectItem value="minimal">Minimal</SelectItem>
          <SelectItem value="retro">Retro</SelectItem>
        </SelectContent>
      </Select>

      <Select value={designStyle} onValueChange={onDesignStyleChange}>
        <SelectTrigger className="w-[140px]">
          <Image className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Design Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="minimal">Minimal</SelectItem>
          <SelectItem value="artistic">Artistic</SelectItem>
          <SelectItem value="geometric">Geometric</SelectItem>
          <SelectItem value="abstract">Abstract</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
