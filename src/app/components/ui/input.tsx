import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-gray-400 selection:bg-blue-500 selection:text-white dark:bg-gray-700/30 border border-gray-300 flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base bg-white transition-colors transition-shadow outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-red-200 dark:aria-invalid:ring-red-400 aria-invalid:border-red-600",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
