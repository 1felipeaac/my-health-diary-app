import ButtonIcon from "./button-icon"
import Text from "./text"
import XIcon from '../assets/icons/X-Regular.svg?react'
import TodoList from '../assets/icons/Todo-List.svg?react'
import Archive from '../assets/icons/Archive.svg?react'
import { cva } from "class-variance-authority"
import { NavLink } from "react-router"
import { BackupButtons } from "./backup-buttons"
import Icon from "./icon"
import { buttonIconVariants } from "./input-file"

interface SidebarProps {
    open: boolean
    onClose: () => void
    title?: string
  }

  export const navLinkVariants = cva(`
    flex items-center justify-start cursor-pointer
    transition rounded-lg group gap-2 hover:bg-pink-light 
    h-14 py-4 px-5 w-full`)

export const navLinkTextVariants = cva(`
    text-[1rem] text-gray-300 min-w-15
`)


  export const sidebarWrapperVariants = cva(`
  flex flex-col items-baseline justify-start py-4 px-4 gap-1.5 h-20
`)
  
  export function Sidebar({ open, onClose, title }: SidebarProps) {
    if (!open) return null
  
    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
  
        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-full bg-gray-100 z-50
            shadow-sm
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <header className="flex items-center justify-between p-4 border-b border-pink-base">
            <Text variant="body-sm-bold">{title}</Text>
            <ButtonIcon
              icon={XIcon}
              variant="tertiary"
              onClick={onClose}
            />
          </header>
  
          <div className={sidebarWrapperVariants()}>
                            
            <NavLink to={"/"} onClick={onClose} className={navLinkVariants()}>
                <Icon svg={TodoList} className={buttonIconVariants()}/>
                <Text variant={"body-sm-bold"} className={navLinkTextVariants()}>
                    Tarefas
                </Text>
            </NavLink>

            <NavLink to={"/historico"} onClick={onClose} className={navLinkVariants()}>
                <Icon svg={Archive} className={buttonIconVariants()}/>
                <Text variant={"body-sm-bold"} className={navLinkTextVariants()}>
                    Histórico
                </Text>
            </NavLink>
            
            <BackupButtons/>
                
          </div>
        </aside>
      </>
    )
  }
  