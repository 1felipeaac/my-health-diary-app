import {cva , type VariantProps} from "class-variance-authority"
import type React from "react"
import Icon from "./icon"
import CheckIcon from "../assets/icons/Square-Regular.svg?react"
import Skeleton from "./skeleton"

export const inputCheckboxWrapperVariants = cva(`
    inline-flex items-center justify-center relative
    group
`)

export const inputCheckboxVariants = cva(`
    appearance-none peer flex items-center justify-center cursor-pointer
    transition overflow-hidden  
`, {
    variants:{
        variant: {
            none:"",
            default: `
            border-2 border-solid
            border-pink-base hover:border-pink-dark hover:bg-pink-dark/20
            checked:border-pink-base checked:bg-pink-base
            group-hover:checked:border-pink-dark group-hover:checked:bg-pink-dark
            disabled:bg-gray-300/40
            `
        },
        size: {
            md: "w-5 h-5 rounded-sm"
        },
        isDisabled:{
            true: "pointer-events-none"
        }
    },
    defaultVariants:{
        variant: "default",
        size: "md",
        isDisabled: false
    }
})

export const inputCheckboxIconVariants = cva(`
    absolute top-1/2 left-1 -translate-y-1/2
    hidden peer-checked:block fill-white
`, {
    variants: {
        size: {
            md: "w-3 h-3"
        }
    },
    defaultVariants:{
        size: "md"
    }
})

interface InputCheckboxProps extends VariantProps<typeof inputCheckboxVariants>,
    Omit<React.ComponentProps<"input">, "size">{
        loading?: boolean
    }

export default function InputCheckbox({
    variant,
    size,
    disabled,
    isDisabled,
    className,
    loading,
    ...props
}:InputCheckboxProps){
    if(loading){
        return <Skeleton
            rounded={"sm"}
            className={
                inputCheckboxVariants({
                    size,
                    variant:"none"
                })
            }
        />
    }
    return (
        <label className={inputCheckboxWrapperVariants({className})}>
            <input type="checkbox" className={inputCheckboxVariants({size, isDisabled})} disabled={disabled} {...props}/>
            <Icon className={inputCheckboxIconVariants({size})} svg={CheckIcon}/>
        </label>
    )
}