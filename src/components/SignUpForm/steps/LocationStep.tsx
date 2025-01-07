import { FormData } from "@/types/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { filterCounties, isValidCounty } from "@/utils/countyData";
import { cn } from "@/lib/utils";

interface LocationStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LocationStep = ({ formData, onInputChange }: LocationStepProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange(e);
    setSuggestions(filterCounties(value));
    setShowSuggestions(true);
    setIsValid(value === "" || isValidCounty(value));
  };

  const handleSuggestionClick = (county: string) => {
    const event = {
      target: {
        name: 'location',
        value: county
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onInputChange(event);
    setSuggestions([]);
    setShowSuggestions(false);
    setIsValid(true);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Label>County</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your county name
        </p>
        <Input
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className={cn(
            "w-full",
            !isValid && "border-red-500 focus-visible:ring-red-500"
          )}
          placeholder="e.g., Los Angeles County, California"
        />
        {!isValid && (
          <p className="text-sm text-red-500 mt-1">
            Please enter a valid US county
          </p>
        )}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            {suggestions.map((county, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(county)}
              >
                {county}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};