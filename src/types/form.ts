export interface FormData {
  fullName: string;
  email: string;
  password: string;
  goal: string;
  location: string;
  phone: string;
  verificationCode: string;
}

export interface FormStep {
  title: string;
  description: string;
  fields: (keyof FormData)[];
  validate?: () => boolean;
}