import {cva , type VariantProps, cx} from "class-variance-authority"
import type React from "react"
import { textVariants } from "./text"

export const inputTextVariants = cva(`
    border-b border-solid border-gray-200 focus:border-pink-base
    bg-transparent outline-none
`, {
    variants: {
        size: {
            md: "pb-2 px-2"
        },
        isDisabled:{
            true: "pointer-events-none"
        }
    }, defaultVariants:{
        size: "md",
        isDisabled: false
    }
})

interface InputTexProps extends VariantProps<typeof inputTextVariants>, Omit<React.ComponentProps<"input">, "size"> {}

export default function InputText({
    size,
    isDisabled,
    disabled,
    className,
    ...props
}:InputTexProps){
    return(
        <input
            className={cx(
                inputTextVariants({size, isDisabled}), 
                textVariants(), 
                className
            )}
            disabled={disabled}
            {...props}
        />
    )
}