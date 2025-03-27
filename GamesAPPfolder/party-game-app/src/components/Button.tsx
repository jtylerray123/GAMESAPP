import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'btn';
  const variantStyles = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const widthStyles = fullWidth ? 'w-full sm:w-auto' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 