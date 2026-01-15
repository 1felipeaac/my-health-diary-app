import Container from "../components/container";
import CalendarHeart from "../assets/icons/Calendar-Heart.svg?react"
import { capitalizeWords, formatDate, today } from "../helpers/utils";
import { cva } from "class-variance-authority";
import Icon from "../components/icon";
import Text from "../components/text";

export const headerWrapperVariants = cva(`
    flex items-center justify-start py-4 gap-1.5 w-full h-20
`)

export const inputTextVariants = cva("", {
    variants: {
        variant: {
            primary: `text-pink-dark font-extrabold text-[30px] md:text-3xl`,
            secondary: `text-pink-dark
                font-bold
                text-2xl
                leading-none
                md:text-2xl`,
        }
    },
    defaultVariants:{
        variant: "primary"
    }
})

export const logoIconVariants = cva("transition", {
    variants: {
        variant: {
            primary: "fill-pink-dark"
        },
        size: {
            md: "w-10 h-10 md:w-12 md:h-12"
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md"
    }
})

export default function Header(){
    const dateFormatted = formatDate(today.toString())
    return(
        <Container as="header">
            <div className={headerWrapperVariants()}>
                <Icon svg={CalendarHeart} className={logoIconVariants()}/>
                <Text as="h1" className={inputTextVariants()}>MeuDiárioFit</Text>
            </div>
             <Text className={inputTextVariants({variant: "secondary"})}>{capitalizeWords(dateFormatted)}</Text>
        </Container>
    )
}