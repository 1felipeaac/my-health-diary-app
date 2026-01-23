import type React from "react";

interface PopUpProps extends React.ComponentProps<"div"> {
    onClick?: () => void
  }
export function PopUp({children, onClick, className}: PopUpProps){

    return(
        <>
            <div 
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm animate-in fade-in" 
            onClick={onClick} 
            />
            
            <div className={className}>
                {children}
            </div>
        </>
    )

}