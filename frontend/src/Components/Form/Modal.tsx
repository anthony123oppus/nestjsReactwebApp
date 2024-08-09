import { ReactNode, HTMLAttributes } from "react"
import clsx from "clsx"
import { IoCloseSharp } from "react-icons/io5"

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    children : ReactNode
    isOpen : boolean
    className : string
    onClick?: () => void
}

const Modal : React.FC<ModalProps> = ({children, className, isOpen, onClick, ...props}) => {
      return (
        // <div className={`absolute top-0 min-w-full bg-black/40 min-h-screen flex justify-center items-center z-[1000] ${isOpen ? 'visible' : 'invisible'} transition-all duration-200 delay-75`} {...props} onClick={onClick}>
         <div className={`fixed inset-0 flex justify-center items-center z-[1000] bg-black/40 backdrop-blur-[5px] ${isOpen ? 'visible' : 'invisible'} transition-all duration-200 delay-75`} {...props} onClick={onClick}> 
            <div className={clsx(`relative flex flex-col items-center justify-center bg-white border-[1px] border-[#033AA9] rounded-[8px] overflow-hidden ${!isOpen ? "invisible scale-50 opacity-0" : "visible scale-100 opacity-1"} transition-all duration-200 delay-75`, className)} onClick={(e) => e.stopPropagation()}>
            <IoCloseSharp className='absolute top-0 right-0 bg-[#ff0000] rounded-bl-xl text-white h-7 w-10 p-[3px] cursor-pointer' onClick={onClick}/>
                {children}
            </div>
          </div>
      )
}

export default Modal