import { NavLink } from "react-router"
import Text from "../components/text"
export default function Footer(){

    return(
        <footer className={`flex items-center justify-center gap-4 bg-pink-light w-full border-t border-gray-200 mt-4 md:mt-8`}>

            <NavLink to={"https://github.com/1felipeaac"}>
                <Text variant={"body-sm-bold"} className="text-gray-400">
                    Felipe
                </Text>
            </NavLink>
        </footer>

    )
}