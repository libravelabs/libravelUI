"use client";

import {
  Button,
  SearchField as SearchBarPrimitive,
  type SearchFieldProps as SearchBarPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { Input, type InputProps } from "./field";
import { cn } from "@/lib/utils";
import { Loader } from "./loader";
import { Search, X } from "lucide-react";

interface SearchBarProps extends SearchBarPrimitiveProps {
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string | ((validation: ValidationResult) => string);
  isLoading?: boolean;
  endContent?: InputProps["endContent"];
}

function SearchBar({
  label,
  placeholder,
  description,
  className,
  error,
  children,
  endContent,
  isLoading,
  ...props
}: SearchBarProps) {
  return (
    <SearchBarPrimitive
      {...props}
      aria-label={props["aria-label"] ?? label ?? "search-bar"}
      className={cn(className, "group relative w-full")}
    >
      {(values) => (
        <>
          {typeof children === "function" ? (
            children(values)
          ) : children ? (
            children
          ) : (
            <Input
              label={label}
              placeholder={placeholder}
              startContent={isLoading ? <Loader variant="spin" /> : <Search />}
              endContent={
                <>
                  {!values.isEmpty && (
                    <Button
                      className="ms-auto rounded p-1 hover:bg-muted hover:text-foreground cursor-pointer"
                      aria-label="Clear selected item"
                    >
                      <X size={12} />
                    </Button>
                  )}
                  {endContent}
                </>
              }
              description={description}
              error={error}
              classNames={{
                wrapper: "group-disabled:[&_svg]:opacity-50",
                input:
                  "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
              }}
            />
          )}
        </>
      )}
    </SearchBarPrimitive>
  );
}

export type { SearchBarProps };
export { SearchBar };
