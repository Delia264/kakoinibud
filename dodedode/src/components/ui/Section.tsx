import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { id, className, title, subtitle, centered = true, children, ...props },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn('py-16 md:py-24 px-4 sm:px-6 lg:px-8', className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto">
          {(title || subtitle) && (
            <div
              className={cn(
                'mb-12 md:mb-16',
                centered && 'text-center'
              )}
            >
              {subtitle && (
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  {title}
                </h2>
              )}
            </div>
          )}
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export const SectionTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-3xl md:text-4xl lg:text-5xl font-bold text-foreground',
      className
    )}
    {...props}
  />
));

SectionTitle.displayName = 'SectionTitle';

export const SectionSubtitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-primary font-semibold tracking-wide uppercase text-sm mb-3',
      className
    )}
    {...props}
  />
));

SectionSubtitle.displayName = 'SectionSubtitle';
