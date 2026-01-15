
import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import Icon from "./icon"
import Import from '../assets/icons/Import.svg?react'


export const inputFileWrapperVariants = cva(`
    inline-flex items-center gap-2 relative
    group cursor-pointer h-14 py-4 px-5 
    bg-gray-200 hover:bg-pink-light
    rounded-lg
    
`)

export const inputFileVariants = cva(`
    appearance-none peer flex items-center justify-center cursor-pointer
    transition overflow-hidden  
`, {
    variants:{
        variant: {
            none:"",
            default: `
            hidden
            `
        },
        size: {
            md: "w-5 h-5 rounded-sm"
        }
    },
    defaultVariants:{
        variant: "default",
        size: "md",
    }
})

export const inputFileIconVariants = cva("transition", {
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

interface InputFileProps extends VariantProps<typeof inputFileVariants>,
    Omit<React.ComponentProps<"input">, "size">{
        label: string
    }


export default function InputFile({
    variant,
    size,
    id,
    label,
    className,
    ...props
}:InputFileProps){
    const inputId = id ?? crypto.randomUUID()
    return(
        <div className={inputFileWrapperVariants({className})}>
            <input
                id={inputId}
                className={inputFileVariants({size})}
                {...props}
                type="file"
            />
            <Icon svg={Import} className={inputFileIconVariants({size})}/>
            <label htmlFor={inputId}>
                {label} 
            </label>
        </div>
    )
}