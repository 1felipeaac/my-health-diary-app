import { cva, cx } from "class-variance-authority";

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