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
    z-10 shrink-0
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
            true: "opacity-50 pointer-events-none grayscale"
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
    const isActuallyDisabled = isDisabled || disabled;

    if (loading) {
        return <div className="w-5 h-5 rounded-full animate-pulse bg-gray-200" />;
    }

    return (
        <label className={inputRadioButtonWrapperVariants({ className })}>
            <input
                type="radio"
                disabled={isActuallyDisabled}
                className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer peer"
                {...props}
            />
            <div className={cx(
                inputRadioButtonVariants({ size, isDisabled: isActuallyDisabled, status }),
                "z-10 pointer-events-none", 
                {
                    "peer-checked:bg-green-base peer-checked:border-green-base": status === "good",
                    "peer-checked:bg-yellow-base peer-checked:border-yellow-base": status === "average",
                    "peer-checked:bg-red-base peer-checked:border-red-base": status === "bad",
                }
            )}>
                <div className={cx(
                    inputRadioButtonIconVariants({ size }),
                    "peer-checked:flex hidden items-center justify-center" 
                )}>
                    <Icon 
                        svg={CheckIcon} 
                        className="w-full h-full fill-white text-white" 
                        style={{ fill: 'white' }} 
                    />
                </div>
            </div>
        </label>
    );
}

export function RatingDisplay({ status, size }: { status: any; size: any }) {
  return (
    <div className={inputRadioButtonWrapperVariants()}>
      <div
        className={cx(
          inputRadioButtonVariants({ status, size }),
          {
            "bg-green-base border-green-base": status === "good",
            "bg-yellow-base border-yellow-base": status === "average",
            "bg-red-base border-red-base": status === "bad",
            "bg-gray-300 border-gray-300": status === "none",
          }
        )}
      >
      </div>
    </div>
  );
}