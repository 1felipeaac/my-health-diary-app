import Container from "../components/container";
import CalendarHeart from "../assets/icons/Calendar-Heart.svg?react"
import Menu from "../assets/icons/Menu.svg?react"
import { capitalizeWords, formatDateFromDate, today } from "../helpers/utils";
import { cva } from "class-variance-authority";
import Text from "../components/text";
import ButtonIcon from "../components/button-icon";
import { Sidebar } from "../components/sidebar";
import React from "react";
import Icon from "../components/icon";
export const headerWrapperVariants = cva(`
    flex items-center justify-start py-4 gap-1.5 w-full h-20
`)

export const inputTextVariants = cva("", {
    variants: {
        variant: {
            primary: `fill-pink-dark font-extrabold text-[30px] md:text-3xl`,
            secondary: `fill-pink-dark text-pink-dark
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
            primary: "fill-pink-base"
        },
        size: {
            md: "w-10 h-10 md:w-13 md:h-13"
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md"
    }
})

export default function Header(){
    const dateFormatted = formatDateFromDate(today)

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

    function handleOnClick(){
        setIsSidebarOpen(!isSidebarOpen)
    }

    return(
        <Container as="header">
            <Sidebar open={isSidebarOpen} title="Menu" onClose={handleOnClick}/>
            <div className={headerWrapperVariants()}>
                <Icon 
                    svg={CalendarHeart}
                    className={logoIconVariants()}
                />
                <Text as="h1" className={inputTextVariants()}>MeuDiárioFit</Text>
            </div>
            <div className="flex items-center gap-2 w-full h-10 mb-2">
                    <ButtonIcon 
                        icon={Menu} 
                        variant={"secondary"} 
                        size={"md"} 
                        className={logoIconVariants()} 
                        style={{height: '30px', width: '30px'}}
                        onClick={handleOnClick}
                    />
                    <Text className={inputTextVariants({variant: "secondary"})}>{"Menu"}</Text>
         
            </div>
            <Text className={inputTextVariants({variant: "secondary"})}>
                {capitalizeWords(dateFormatted)}
            </Text>
        </Container>
    )
}