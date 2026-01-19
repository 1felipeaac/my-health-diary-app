
import type React from "react"
import Import from '../assets/icons/Import.svg?react'
import { cva } from "class-variance-authority"
import Icon from "./icon"


export const inputFileWrapperVariants = cva(`
    flex items-center justify-center cursor-pointer
    transition rounded-lg group gap-2 bg-gray-200 hover:bg-pink-light
    h-14 py-4 px-5
`)

export const inputTextVariants = cva("", {
    variants: {
        variant: {
            primary: "text-gray-400"
        }
    },
    defaultVariants:{
        variant: "primary"
    }
})

export const buttonIconVariants = cva("transition", {
    variants: {
        variant: {
            primary: "text-pink-base"
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
        <div className={inputFileWrapperVariants()}>
            <Icon svg={Import} className={buttonIconVariants({variant: "primary", size: "md"})} />
            <label
                htmlFor={inputId}
                style={{cursor: 'pointer'}}
                className={inputTextVariants()}
            >
                {label}
            </label>
            <input
                id={inputId}
                style={{display: 'none'}}
                {...props}
                type="file"
            />

        </div>
    )
}