import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

export function PrimaryButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[56px]";
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-sm",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    ghost: "text-foreground hover:bg-muted",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
