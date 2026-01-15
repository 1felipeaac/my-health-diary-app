import {cva , type VariantProps} from "class-variance-authority"
import type React from "react"
import Icon from "./icon"
import CheckIcon from "../assets/icons/Square-Regular.svg?react"
import Skeleton from "./skeleton"
export const inputRadioButtonWrapperVariants = cva(`
    inline-flex items-center justify-center relative
    group
`)

export const inputRadioButtonVariants = cva(`
    appearance-none peer flex items-center justify-center cursor-pointer
    transition overflow-hidden  
`, {
    variants:{
        variant: {
            none:"",
            default: `border-2 border-solid`
        },
        status: {
            good: `border-green-base peer-checked:bg-green-base 
                hover:border-green-dark hover:bg-green-dark/20 
                checked:border-green-base checked:bg-green-base`,
            average: `border-yellow-base peer-checked:bg-yellow-base 
                hover:border-yellow-dark hover:bg-yellow-dark/20 
                checked:border-yellow-base checked:bg-yellow-base`,
            bad: `border-red-base peer-checked:bg-red-base 
                hover:border-red-dark hover:bg-red-dark/20 
                checked:border-red-base checked:bg-red-base`,
            none: "border-gray-300"
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

export const inputRadioButtonIconVariants = cva(`
    absolute top-1/2 left-1 -translate-y-1/2
    hidden peer-checked:block fill-white
`, {
    variants: {
        size: {
            md: "w-3 h-3"
        },
    },
    defaultVariants:{
        size: "md",
    }
})

interface InputRadioButtonProps extends VariantProps<typeof inputRadioButtonVariants>,
    Omit<React.ComponentProps<"input">, "size">{
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
}:InputRadioButtonProps){
    if(loading){
        return <Skeleton
            rounded={"sm"}
            className={
                inputRadioButtonVariants({
                    size,
                    status:"none"
                })
            }
        />
    }
    return (
        <label className={inputRadioButtonWrapperVariants({className})}>
            <input type="radio" className={inputRadioButtonVariants({size, isDisabled, status})} disabled={disabled} {...props}/>
            <Icon className={inputRadioButtonIconVariants({size})} svg={CheckIcon}/>
        </label>
    )
}