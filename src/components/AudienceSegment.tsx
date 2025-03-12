
import { useState } from "react";
import { Target } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AudienceSegmentProps {
  onChange: (segment: string) => void;
}

export function AudienceSegment({ onChange }: AudienceSegmentProps) {
  const [segment, setSegment] = useState("all");

  const handleChange = (value: string) => {
    setSegment(value);
    onChange(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger>
          <Target className="w-4 h-4 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Filter insights by audience segment</p>
        </TooltipContent>
      </Tooltip>
      
      <Select value={segment} onValueChange={handleChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select Audience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Audiences</SelectItem>
          <SelectItem value="core">Core Fans (18-24)</SelectItem>
          <SelectItem value="casual">Casual Listeners</SelectItem>
          <SelectItem value="potential">Potential Fans</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
