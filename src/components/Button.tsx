import React from 'react'

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'large';
  variant?: 'primary' | 'secondary';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
    children,
    className = '',
    size = 'small',
    variant = 'primary',
    onClick,
} : ButtonProps) => {

    const buttonSize =
        size === 'large'
            ? 'md:text-lg  md:px-5 md:py-3'
            : 'px-4 py-3 text-sm';

    const buttonVariant =
        variant === 'secondary'
            ? 'bg-black text-grey'
            : 'border-2 border-black text-black';

    return (
        <button onClick={onClick} className={`${buttonVariant} ${buttonSize}  rounded-full font-semibold ${className}`}>
            {children}
        </button>
    )
}

export default Button