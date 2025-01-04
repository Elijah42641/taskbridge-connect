import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface VerificationStepProps {
  phone: string;
}

export const VerificationStep = ({ phone }: VerificationStepProps) => {
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = () => {
    // In a real app, this would make an API call to send the code
    toast({
      title: "Verification Code Sent",
      description: `A code has been sent to ${phone}`,
    });
    setIsCodeSent(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <Label htmlFor="verification-code">Enter Verification Code</Label>
        <div className="flex flex-col items-center space-y-4">
          <InputOTP
            value={value}
            onChange={setValue}
            maxLength={6}
            render={({ slots }) => (
              <InputOTPGroup className="gap-2">
                {slots.map((slot, i) => (
                  <InputOTPSlot key={i} {...slot} data-index={i} />
                ))}
              </InputOTPGroup>
            )}
          />
          {!isCodeSent && (
            <Button
              variant="outline"
              onClick={handleSendCode}
              className="mt-4"
              type="button"
            >
              Send Code
            </Button>
          )}
          {isCodeSent && value.length < 6 && (
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code sent to your phone
            </p>
          )}
        </div>
      </div>
    </div>
  );
};