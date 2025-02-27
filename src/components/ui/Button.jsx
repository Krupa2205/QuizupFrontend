import React from "react";
import { tv } from "tailwind-variants";
import clsx from "clsx";

// Define button styles
const button = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-6 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export function Button({ className, variant, size, ...props }) {
  return <button className={clsx(button({ variant, size }), className)} {...props} />;
}
