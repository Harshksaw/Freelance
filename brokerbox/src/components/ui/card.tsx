import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';


interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-gray-200 bg-white shadow-sm',
          className
        )}
        {...props}
      >
        {(title || description) && (
          <div className="p-6 pb-0">
            {title && (
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-gray-600 mt-1">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card }; 