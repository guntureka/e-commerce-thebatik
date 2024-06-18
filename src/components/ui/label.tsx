import { cn } from "@/lib/utils";
import React from "react";

interface LabelProps {
  id: string;
  label: string;
  className: string;
}

const Label = ({ id, label, className }: LabelProps) => {
  return (
    <label
      htmlFor={id}
      className={cn("text-md block leading-tight", className)}
    >
      {label}
    </label>
  );
};

export default Label;
