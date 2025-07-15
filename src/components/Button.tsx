import React from 'react'

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'large';
  variant?: 'primary' | 'secondary';
};

const Button = ({
    children,
    className = '',
    size = 'small',
    variant = 'primary'
} : ButtonProps) => {

    const buttonSize =
        size === 'large'
            ? 'md:text-lg  md:px-5 md:py-3'
            : 'px-4 py-3 text-sm';

    const buttonVariant =
        variant === 'secondary'
            ? 'bg-mint text-primary'
            : 'border-2 border-mint text-mint';

    return (
        <button className={`${buttonVariant} ${buttonSize}  rounded-full font-semibold ${className}`}>
            {children}
        </button>
    )
}

export default Button