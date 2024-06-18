import React, { useEffect, useState } from "react";
import {
  FieldError,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import Input from "./input";
import Label from "./label";
import { cn } from "@/lib/utils";
import { Span } from "next/dist/trace";
import Textarea from "./textarea";

interface FormFieldProps {
  label: string;
  placeholder?: string;
  id: string;
  className?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  isPassword?: boolean; 
  type?: string;
  disabled?: boolean;
  variants?: "input" | "textarea";
  required?: boolean;
  value?: string;
  name?: string;
}

const FormField = ({
  label,
  placeholder,
  id,
  className,
  register,
  error,
  isPassword = false, 
  type = "text",
  disabled = false,
  variants = "input",
  required = false,
  value,
  name = id,
}: FormFieldProps) => {
  return (
    <div className={cn("relative w-full space-y-1", className)}>
      <Label id={id} label={label} className={""} />
      {variants == "textarea" ? (
        <Textarea
          className={""}
          id={id}
          type={type}
          register={register}
          disabled={disabled}
          isPassword={isPassword}
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <Input
          className={""}
          id={id}
          type={type}
          register={register}
          disabled={disabled}
          isPassword={isPassword}
          placeholder={placeholder}
          required={required}
          value={value}
          name={name}
        />
      )}
      {error && <p className="py-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormField;
