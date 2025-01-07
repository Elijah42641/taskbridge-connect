import { FormData } from "@/types/form";
import { GlobeSelector } from "../GlobeSelector";
import { Label } from "@/components/ui/label";

interface LocationStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LocationStep = ({ formData, onInputChange }: LocationStepProps) => {
  const handleLocationSelect = (coordinates: string) => {
    const event = {
      target: {
        name: 'location',
        value: coordinates
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onInputChange(event);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Select Your Location</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Click on the globe to select your location
        </p>
        <GlobeSelector onLocationSelect={handleLocationSelect} />
        {formData.location && (
          <p className="mt-2 text-sm text-muted-foreground">
            Selected coordinates: {formData.location}
          </p>
        )}
      </div>
    </div>
  );
};