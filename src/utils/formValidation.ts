export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequiredFields = (data: Record<string, string>, fields: string[]): boolean => {
  return fields.every((field) => data[field]?.trim());
};