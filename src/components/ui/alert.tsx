import * as React from 'react';
import { AlertCircle, Check, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const alertVariants = cva('flex items-center text-sm rounded-lg py-3 px-4', {
  variants: {
    variant: {
      default: 'bg-blue-50 text-blue-800',
      error: 'bg-red-50 text-red-800',
      success: 'bg-green-50 text-green-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  message: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, message, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    const dismiss = () => setVisible(true);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className, {
          hidden: visible,
        })}
        {...props}
      >
        <div
          className={`center-flex h-5 w-5 shrink-0 rounded-full text-white ${
            variant === 'error'
              ? 'bg-red-600'
              : variant === 'success'
                ? 'bg-green-500'
                : 'bg-blue-500'
          }`}
        >
          {variant === 'success' ? (
            <Check
              size={16}
              color="white"
            />
          ) : variant === 'error' ? (
            <X
              size={16}
              color="white"
            />
          ) : (
            <AlertCircle
              size={16}
              color="white"
            />
          )}
        </div>
        <p className="ml-3">{message}</p>
        <div
          className={`center-flex ml-auto h-8 w-8 shrink-0 cursor-pointer rounded-md ${
            variant === 'error'
              ? 'hover:bg-red-600/10'
              : variant === 'success'
                ? 'hover:bg-green-500/10'
                : 'hover:bg-blue-500/10'
          }`}
          onClick={dismiss}
        >
          <X
            size={20}
            color={
              variant === 'error'
                ? '#dc2626'
                : variant === 'success'
                  ? '#22c55e'
                  : '#0ea5e9'
            }
          />
        </div>
      </div>
    );
  },
);
Alert.displayName = 'Alert';

export { Alert };
