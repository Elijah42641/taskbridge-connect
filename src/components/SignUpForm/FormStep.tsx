import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormStepProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const FormStep = ({ children, title, description }: FormStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      {children}
    </motion.div>
  );
};