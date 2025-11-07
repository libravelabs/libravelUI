"use client";

import {
  Button,
  SearchField as SearchBarPrimitive,
  type SearchFieldProps as SearchBarPrimitiveProps,
} from "react-aria-components";
import { Input, type InputProps } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";
import { Search, X } from "lucide-react";

type SearchBarProps = SearchBarPrimitiveProps & InputProps;

function SearchBar({
  placeholder,
  error,
  description,
  endContent,
  label,
  labelExtra,
  classNames = {
    wrapper: "group-disabled:[&_svg]:opacity-50",
    input:
      "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
  },
  variant,
  size,
  isDisabled,
  isLoading,
  className,
  children,
  ...props
}: SearchBarProps) {
  const inputProps: InputProps = {
    placeholder,
    error,
    description,
    endContent,
    label,
    labelExtra,
    classNames,
    variant,
    size,
    isDisabled,
    isLoading,
  };

  const SearchFieldProps: SearchBarPrimitiveProps = {
    ...props,
    "aria-label":
      typeof props["aria-label"] === "string"
        ? props["aria-label"]
        : typeof label === "string"
          ? label
          : "text-field",
  };

  return (
    <SearchBarPrimitive
      {...SearchFieldProps}
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
              {...inputProps}
              startContent={isLoading ? <Loader variant="spin" /> : <Search />}
              endContent={
                <>
                  {!values.isEmpty && (
                    <Button
                      className="ms-auto rounded hover:text-foreground cursor-pointer"
                      aria-label="Clear selected item"
                    >
                      <X className="size-3" />
                    </Button>
                  )}
                  {endContent}
                </>
              }
            />
          )}
        </>
      )}
    </SearchBarPrimitive>
  );
}

export type { SearchBarProps };
export { SearchBar };
