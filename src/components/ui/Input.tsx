import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium mb-2 text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5',
            'bg-background border border-input',
            'text-foreground placeholder:text-muted-foreground',
            'rounded-lg',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-destructive focus:ring-destructive',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
  }
>(({ className, label, error, id, ...props }, ref) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium mb-2 text-foreground"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'w-full px-4 py-2.5',
          'bg-background border border-input',
          'text-foreground placeholder:text-muted-foreground',
          'rounded-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'resize-none',
          error && 'border-destructive focus:ring-destructive',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
