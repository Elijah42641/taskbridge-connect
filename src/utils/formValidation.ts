import { FormData } from "@/types/form";

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequiredFields = (data: FormData, fields: (keyof FormData)[]): boolean => {
  return fields.every((field) => data[field]?.trim());
};