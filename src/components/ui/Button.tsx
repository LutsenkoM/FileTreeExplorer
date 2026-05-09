import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export const Button = ({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-md px-4 py-2 text-sm font-medium shadow-sm transition disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-primary text-white hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500",
        variant === "secondary" &&
          "border border-border-soft bg-white text-slate-700 hover:bg-slate-50 disabled:text-slate-400",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
