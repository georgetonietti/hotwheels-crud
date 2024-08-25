import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
    children: ReactNode
    variant?: "primary" | "secondary"
}
const buttonVariants = {
    primary: 'bg-indigo-900 text-zinc-50 hover:bg-zinc-50 hover:text-indigo-900',
    secondary: 'bg-zinc-50 text-indigo-900 hover:bg-indigo-900 hover:text-zinc-50',
}

export default function Button({ variant = "primary", ...props }: ButtonProps) {

    return (
        <button
            className={twMerge(
                'w-auto whitespace-nowrap h-10 border-2 border-indigo-900 rounded-md py-1 px-3 font-bold text-lg disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:text-zinc-50',
                buttonVariants[variant]
            )}
            {...props}
        >
            {props.children}
        </button>
    );
}