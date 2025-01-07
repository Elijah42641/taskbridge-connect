import { FormData } from "@/types/form";
import { MapSelector } from "../MapSelector";
import { Label } from "@/components/ui/label";

interface LocationStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LocationStep = ({ formData, onInputChange }: LocationStepProps) => {
  const handleLocationSelect = (address: string) => {
    const event = {
      target: {
        name: 'location',
        value: address
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onInputChange(event);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Select Your Location</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Click on the map to select your location
        </p>
        <MapSelector onLocationSelect={handleLocationSelect} />
        {formData.location && (
          <p className="mt-2 text-sm text-muted-foreground">
            Selected location: {formData.location}
          </p>
        )}
      </div>
    </div>
  );
};