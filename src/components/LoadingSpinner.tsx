
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "rounded-full border-t-transparent animate-spin-slow",
          "border-primary",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}
