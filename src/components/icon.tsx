import { cva, cx, type VariantProps } from "class-variance-authority";
import type React from "react";

export const iconVariants = cva("", {
    variants: {
        animate: {
            false: "",
            true: "animate-spin"
        },
        defaultVariants: {
            animate: false
        }
    }
})

interface IconProps extends React.ComponentProps<"svg">, VariantProps<typeof iconVariants>{
    svg: React.FC<React.ComponentProps<"svg">>
}
export default function Icon({svg: SvgComponent,animate, className, stroke, ...props}:IconProps){

    return <SvgComponent className={cx(iconVariants({ animate }), className, stroke)} {...props}/>
}