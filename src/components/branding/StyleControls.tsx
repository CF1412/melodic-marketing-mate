
import { Palette, Image, Type, Hash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
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
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Choose your brand color scheme</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
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
        </TooltipTrigger>
        <TooltipContent>
          <p>Select your visual design style</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Select disabled defaultValue="default">
              <SelectTrigger className="w-[140px]">
                <Type className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Typography" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Modern Sans</SelectItem>
                <SelectItem value="serif">Elegant Serif</SelectItem>
                <SelectItem value="display">Bold Display</SelectItem>
                <SelectItem value="handwritten">Handwritten</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Customize your typography style (Premium)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Select disabled defaultValue="default">
              <SelectTrigger className="w-[140px]">
                <Hash className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Hashtags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Auto-Generate</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Hashtag strategy preferences (Premium)</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
