
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingProgress = ({ currentStep, totalSteps }: OnboardingProgressProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Langkah {currentStep} dari {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              i + 1 <= currentStep 
                ? "bg-primary" 
                : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
};
