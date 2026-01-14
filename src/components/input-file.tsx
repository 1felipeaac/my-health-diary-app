
import type React from "react"
import Import from '../assets/icons/Import.svg?react'
import { cva } from "class-variance-authority"
import Button from "./button"

export const buttonIconVariants = cva("transition", {
    variants: {
        variant: {
            primary: "fill-pink-base"
        },
        size: {
            md: "w-5 h-5"
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md"
    }
})


interface InputFileProps
  extends Omit<React.ComponentProps<"input">, "size" | "disabled"> {
  label: string
}

export default function InputFile({
    id,
    label,
    className,
    ...props
}:InputFileProps){
    const inputId = id ?? crypto.randomUUID()
    return(
        <div>
            <input
                id={inputId}
                style={{display: 'none'}}
                {...props}
                type="file"
            />
            <Button  icon={Import} >
                <label
                    htmlFor={inputId}
                    style={{cursor: 'pointer'}}
                >
                    {label}
                </label>
            </Button>
        </div>
    )
}