import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types/form";

interface ContactStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactStep = ({ formData, onInputChange }: ContactStepProps) => {
  const getCharacterCount = (value: string) => {
    return `${value.length}/15`;
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onInputChange}
            className="input-field pr-16"
            placeholder="+1 (555) 000-0000"
            minLength={10}
            maxLength={15}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {getCharacterCount(formData.phone)}
          </span>
        </div>
      </div>
    </div>
  );
};