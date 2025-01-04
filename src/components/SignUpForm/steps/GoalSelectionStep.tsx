import { FormData } from "@/types/form";

interface GoalSelectionStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const GoalSelectionStep = ({ formData, setFormData }: GoalSelectionStepProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {["Rent gear or services", "Offer gear or services", "Both"].map((option) => (
          <button
            key={option}
            onClick={() => setFormData((prev) => ({ ...prev, goal: option }))}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              formData.goal === option
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/50"
            }`}
          >
            <div className="font-medium">{option}</div>
          </button>
        ))}
      </div>
    </div>
  );
};