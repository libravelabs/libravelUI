import React, { createContext, useContext, useId, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Link, type InertiaLinkProps } from "@inertiajs/react";
import { Heading } from "@/components/ui/core/heading";
import { Separator } from "@/components/ui/core/separator";
import { Button } from "@/components/ui/core/button";
import { TextField } from "@/components/ui/core/text-field";
import { Input } from "@/components/ui/core/input";
import { LuArrowRight } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/core/form";
import { FieldError } from "@/components/ui/core/field";

type FooterVariant = VariantProps<typeof footerVariants>["variant"];

interface FooterLinkItem {
  label: React.ReactNode;
  href: string;
  external?: boolean;
}

interface FooterSectionData {
  title: React.ReactNode;
  links: FooterLinkItem[];
}

interface FooterSocialItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterNewsletterData {
  title?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  buttonLabel?: React.ReactNode;
  onSubmit?: (email: string) => void;
}

interface FooterContextValue {
  variant: FooterVariant;
}

const FooterContext = createContext<FooterContextValue>({
  variant: "default",
});

function useFooterVariant() {
  return useContext(FooterContext).variant;
}

const footerVariants = cva(
  "w-full border-t border-border/40 bg-background text-foreground",
  {
    variants: {
      variant: {
        default: "",
        centered: "text-center",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type FooterOwnProps = VariantProps<typeof footerVariants> & {
  logo?: React.ReactNode;
  description?: React.ReactNode;
  sections?: FooterSectionData[];
  social?: FooterSocialItem[];
  newsletter?: FooterNewsletterData;
  copyright?: React.ReactNode;
  bottomLinks?: FooterLinkItem[];
};

type FooterProps = Omit<React.ComponentProps<"footer">, "children"> &
  FooterOwnProps & {
    children?: React.ReactNode;
  };

function Footer({
  variant = "default",
  className,
  children,
  logo,
  description,
  sections,
  social,
  newsletter,
  copyright,
  bottomLinks,
  "aria-label": ariaLabel = "Footer",
  ...props
}: FooterProps) {
  const resolvedVariant = variant ?? "default";
  const isDataDriven = !children;

  return (
    <FooterContext.Provider value={{ variant: resolvedVariant }}>
      <footer
        data-slot="footer"
        data-variant={resolvedVariant}
        aria-label={ariaLabel}
        className={cn(footerVariants({ variant: resolvedVariant }), className)}
        {...props}
      >
        {isDataDriven ? (
          <FooterAutoLayout
            logo={logo}
            description={description}
            sections={sections}
            social={social}
            newsletter={newsletter}
            copyright={copyright}
            bottomLinks={bottomLinks}
          />
        ) : (
          children
        )}
      </footer>
    </FooterContext.Provider>
  );
}

function FooterContainer({ className, ...props }: React.ComponentProps<"div">) {
  const variant = useFooterVariant();

  return (
    <div
      data-slot="footer-container"
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 sm:py-16 lg:px-8",
        variant === "centered" && "items-center",
        className,
      )}
      {...props}
    />
  );
}

function FooterBrand({ className, ...props }: React.ComponentProps<"div">) {
  const variant = useFooterVariant();

  return (
    <div
      data-slot="footer-brand"
      className={cn(
        "flex max-w-sm flex-col gap-4",
        variant === "centered" && "mx-auto items-center text-center",
        className,
      )}
      {...props}
    />
  );
}

function FooterLogo({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer-logo"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function FooterDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="footer-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function FooterNavigation({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  const variant = useFooterVariant();

  return (
    <nav
      data-slot="footer-navigation"
      aria-label="Footer navigation"
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3",
        variant === "centered" &&
          "grid-cols-1 justify-items-center gap-y-10 text-center sm:grid-cols-2 md:grid-cols-3",
        className,
      )}
      {...props}
    />
  );
}

function FooterSection({ className, ...props }: React.ComponentProps<"div">) {
  const variant = useFooterVariant();

  return (
    <div
      data-slot="footer-section"
      className={cn(
        "flex flex-col gap-4",
        variant === "centered" && "items-center",
        className,
      )}
      {...props}
    />
  );
}

function FooterSectionTitle({
  className,
  ...props
}: React.ComponentProps<typeof Heading>) {
  return (
    <Heading
      level={4}
      data-slot="footer-section-title"
      className={cn(
        "text-xs font-semibold tracking-wide text-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}

function FooterLinks({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="footer-links"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

interface FooterLinkProps extends InertiaLinkProps {
  external?: boolean;
}

function FooterLink({
  className,
  external,
  target,
  rel,
  ...props
}: FooterLinkProps) {
  return (
    <li data-slot="footer-link-item">
      <Link
        data-slot="footer-link"
        target={external ? "_blank" : target}
        rel={external ? "noreferrer" : rel}
        className={cn("text-sm", className)}
        {...props}
      />
    </li>
  );
}

function FooterSocial({ className, ...props }: React.ComponentProps<"nav">) {
  const variant = useFooterVariant();

  return (
    <nav
      data-slot="footer-social"
      aria-label="Social media"
      className={cn(
        "flex items-center gap-3",
        variant === "centered" && "justify-center",
        className,
      )}
      {...props}
    />
  );
}

interface FooterSocialLinkProps extends InertiaLinkProps {
  label: string;
}

function FooterSocialLink({
  label,
  className,
  children,
  ...props
}: FooterSocialLinkProps) {
  return (
    <Link
      data-slot="footer-social-link"
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className={cn("size-fit", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

interface FooterNewsletterProps
  extends
    Omit<React.ComponentProps<typeof Form>, "onSubmit">,
    FooterNewsletterData {}

function FooterNewsletter({
  title = "Subscribe to updates",
  description,
  placeholder = "you@example.com",
  buttonLabel = "Subscribe",
  onSubmit,
  className,
  ...props
}: FooterNewsletterProps) {
  const [email, setEmail] = useState("");
  const fieldId = useId();

  return (
    <div
      data-slot="footer-newsletter"
      className={cn("flex flex-col gap-3 max-w-sm", className)}
    >
      {title && (
        <FooterSectionTitle className="normal-case tracking-normal text-sm font-medium">
          {title}
        </FooterSectionTitle>
      )}
      {description && <FooterDescription>{description}</FooterDescription>}
      <Form
        {...props}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.(email);
        }}
        className="flex w-full flex-col gap-2 sm:flex-row"
      >
        <TextField
          aria-label="Email address"
          id={fieldId}
          type="email"
          value={email}
          onChange={setEmail}
          isRequired
          className="flex-1"
        >
          <Input placeholder={placeholder} />
          <FieldError />
        </TextField>
        <Button type="submit" size="default">
          {buttonLabel}
          <LuArrowRight />
        </Button>
      </Form>
    </div>
  );
}

function FooterBottom({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer-bottom"
      className={cn(
        "flex flex-col items-center gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between",
        className,
      )}
      {...props}
    />
  );
}

function FooterCopyright({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="footer-copyright"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function FooterDivider({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="footer-divider"
      className={cn("my-2", className)}
      {...props}
    />
  );
}

function FooterAutoLayout({
  logo,
  description,
  sections,
  social,
  newsletter,
  copyright,
  bottomLinks,
}: FooterOwnProps) {
  const variant = useFooterVariant();
  const hasBottom = Boolean(copyright || bottomLinks?.length);

  return (
    <FooterContainer>
      <div
        className={cn(
          "flex flex-col gap-10",
          variant !== "centered" && "lg:flex-row lg:justify-between",
        )}
      >
        {(logo || description || social) && (
          <FooterBrand>
            {logo && <FooterLogo>{logo}</FooterLogo>}
            {description && (
              <FooterDescription>{description}</FooterDescription>
            )}
            {social && social.length > 0 && (
              <FooterSocial>
                {social.map((item) => (
                  <FooterSocialLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                  >
                    {item.icon}
                  </FooterSocialLink>
                ))}
              </FooterSocial>
            )}
          </FooterBrand>
        )}

        {newsletter && <FooterNewsletter {...newsletter} />}

        {sections && sections.length > 0 && (
          <FooterNavigation className="lg:flex-1">
            {sections.map((section, i) => (
              <FooterSection key={i}>
                <FooterSectionTitle>{section.title}</FooterSectionTitle>
                <FooterLinks>
                  {section.links.map((link) => (
                    <FooterLink
                      key={link.href}
                      href={link.href}
                      external={link.external}
                    >
                      {link.label}
                    </FooterLink>
                  ))}
                </FooterLinks>
              </FooterSection>
            ))}
          </FooterNavigation>
        )}
      </div>

      {hasBottom && (
        <FooterBottom>
          {copyright ? (
            <FooterCopyright>{copyright}</FooterCopyright>
          ) : (
            <span />
          )}
          {bottomLinks && bottomLinks.length > 0 && (
            <FooterLinks className="flex-row gap-6">
              {bottomLinks.map((link) => (
                <FooterLink
                  key={link.href}
                  href={link.href}
                  external={link.external}
                >
                  {link.label}
                </FooterLink>
              ))}
            </FooterLinks>
          )}
        </FooterBottom>
      )}
    </FooterContainer>
  );
}

export {
  Footer,
  FooterContainer,
  FooterBrand,
  FooterLogo,
  FooterDescription,
  FooterNavigation,
  FooterSection,
  FooterSectionTitle,
  FooterLinks,
  FooterLink,
  FooterSocial,
  FooterSocialLink,
  FooterNewsletter,
  FooterBottom,
  FooterCopyright,
  FooterDivider,
  useFooterVariant,
};

export type {
  FooterVariant,
  FooterProps,
  FooterLinkItem,
  FooterSectionData,
  FooterSocialItem,
  FooterNewsletterData,
  FooterLinkProps,
  FooterSocialLinkProps,
  FooterNewsletterProps,
};
