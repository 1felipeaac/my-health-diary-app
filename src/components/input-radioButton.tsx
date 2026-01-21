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
    relative
    flex items-center justify-center
    border-2 border-solid
    transition
`, {
    variants:{
        variant: {
            none:"",
            default: `border-2 border-solid`
        },
        status: {
            good: `
            border-green-base
            peer-checked:bg-green-base
          `,
          average: `
            border-yellow-base
            peer-checked:bg-yellow-base
          `,
          bad: `
            border-red-base
            peer-checked:bg-red-base
          `,
          none: "border-gray-300"
        },
        size: {
          md: "w-5 h-5 rounded-sm"
        },
        isDisabled: {
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
    absolute
    w-3 h-3
    fill-white
    hidden
    peer-checked:block
    pointer-events-none
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
            <input type="radio" className={"peer absolute opacity-0 w-0 h-0"} disabled={disabled} {...props}/>
            <div
                className={inputRadioButtonVariants({
                size,
                status,
                isDisabled
                })}
            >
                <Icon className={inputRadioButtonIconVariants({size})} svg={CheckIcon}/>
            </div>
        </label>
    )
}