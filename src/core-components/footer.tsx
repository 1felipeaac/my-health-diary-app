import { NavLink } from "react-router"
import Text from "../components/text"
import { cva } from "class-variance-authority"
import Icon from "../components/icon"
import GithubIcon from "../assets/icons/Github.svg?react"

export const footerWrapperVariants = cva(`
    flex items-center justify-center py-4 gap-1.5 
    mx-auto max-w-[31.5rem] px-2 space-y-3 bg-pink-light rounded-lg mt-8
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
        <footer className={footerWrapperVariants()}>
            <NavLink 
                to={"https://github.com/1felipeaac"} 
                className={"flex items-center"} 
                target="_blank" 
                rel="noopener noreferrer"
            >

                <Icon svg={GithubIcon} className={footerButtonIconVariants()}/>
                <Text variant={"body-sm-bold"} className="text-gray-400">
                    Felipe
                </Text>
            </NavLink>
        </footer>

    )
}