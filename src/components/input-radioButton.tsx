import { cx } from "class-variance-authority" 
import { cva, type VariantProps } from "class-variance-authority"
import CheckIcon from "../assets/icons/Square-Regular.svg?react"
import Icon from "./icon"

export const inputRadioButtonWrapperVariants = cva(`
    inline-flex items-center justify-center relative
    group shrink-0 select-none
`)

export const inputRadioButtonVariants = cva(`
    appearance-none peer flex items-center justify-center cursor-pointer
    transition-all overflow-hidden outline-none
    /* Melhoria de foco para acessibilidade */
    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400
`, {
    variants: {
        variant: {
            none: "",
            default: `border-2 border-solid`
        },
        status: {
            good: `border-green-base checked:bg-green-base hover:bg-green-dark/20`,
            average: `border-yellow-base checked:bg-yellow-base hover:bg-yellow-dark/20`,
            bad: `border-red-base checked:bg-red-base hover:bg-red-dark/20`,
            none: "border-gray-300"
        },
        size: {
            md: "w-5 h-5 rounded-full" 
        },
        isDisabled: {
            true: "pointer-events-none"
        }
    },
    defaultVariants: {
        variant: "default",
        status: "none",
        size: "md",
        isDisabled: false
    }
})

export const inputRadioButtonIconVariants = cva(`
    absolute pointer-events-none
    hidden peer-checked:flex items-center justify-center fill-white
`, {
    variants: {
        size: {
            md: "w-3 h-3"
        },
    },
    defaultVariants: {
        size: "md",
    }
})

interface InputRadioButtonProps extends 
    Omit<React.ComponentProps<"input">, "size">, 
    VariantProps<typeof inputRadioButtonVariants> {
    loading?: boolean
}

export default function InputRadioButton({
    status,
    size,
    isDisabled,
    disabled,
    className,
    loading,
    ...props
}: InputRadioButtonProps) {
    
    const isActuallyDisabled = isDisabled || disabled

    if (loading) {
        return (
            <div className={cx(
                inputRadioButtonVariants({ size, status: "none" }), 
                "animate-pulse bg-gray-200 border-none",
                className
            )} />
        )
    }

    return (
        <label className={inputRadioButtonWrapperVariants({ className })}>
            <input
                type="radio"
                disabled={isActuallyDisabled}
                className={inputRadioButtonVariants({ 
                    size, 
                    isDisabled: isActuallyDisabled, 
                    status 
                })}
                {...props}
            />

            <div className={inputRadioButtonIconVariants({ size })}>
                <Icon svg={CheckIcon} className="w-full h-full" />
            </div>
        </label>
    )
}