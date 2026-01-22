import { cva } from "class-variance-authority"

export const footerWrapperVariants = cva(`
    flex items-center justify-center py-2 gap-1.5 
    mx-auto max-w-[30.5rem] px-2 bg-pink-light rounded-lg mt-8
`)

export const footerButtonIconVariants = cva("transition", {
    variants: {
        variant: {
            primary: "fill-gray-400 m-0"
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

export default function Footer(){

    return(
        <footer>
        </footer>

    )
}