import { Fragment, useRef, useState } from "react";
import ButtonLoader from "../../common/Loader/ButtonLoader";
import { motion } from "framer-motion";
import { useDispatch  } from "react-redux";
import { deleteSliceActions } from "../../store/deleteSlice";
import { dialogSliceActions } from "../../store/dialog";
import { Dialog, Transition } from "@headlessui/react";

import { IoCloseSharp } from "react-icons/io5";
import api from "../API/api";


const iconSvg = {
    hidden: {
        pathLength: 0,
        fill: "rgba(255, 0, 0, 0)", // Red with 0 opacity initially
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    visible: {
        pathLength: 1,
        fill: "rgba(255, 0, 0, 1)", // Red with full opacity when visible
        transition: { duration: 0.5, ease: "easeInOut" },
    },
};

interface deleteToastProps {
    isDelete : boolean
    handleDeleteModal : () => void
    route : string
    id : number
    name : string
    header : string
    handleFetch : () => void
}

const DeleteToast : React.FC<deleteToastProps> = ({isDelete, handleDeleteModal, route, id, name, header, handleFetch}) => {

    const dispatch = useDispatch()

    const cancelButtonRef = useRef(null)
    const [processsing, setProcessing] = useState<boolean>(false)

    const handleConfirm = async(id: number) => {
        setProcessing(true)
        try {
            const responseDelete = await api.delete(`${route}/${id}`)
            if(responseDelete.status === 200){
                handleFetch()
                dispatch(deleteSliceActions.onDeleteClose());
                dispatch(
                    dialogSliceActions.onDialog({
                        type: "success",
                        header: "Deleted Successfully",
                        message: `${name} Deleted Successfully`,
                    })
                );
            }      
        } catch (error) {
            dispatch(
                dialogSliceActions.onDialog({
                    type: "error",
                    header: "Failure",
                    message: `${name} Deleted Failed`,
                })
            );
        }   
        setProcessing(false)
    };

    return (
    <Transition.Root show={isDelete} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" initialFocus={cancelButtonRef} onClose={handleDeleteModal}>
             
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[5px] transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg  bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all border-[#991b1b] border-[1px] sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                <IoCloseSharp
                className="absolute top-0 right-0 bg-[#ff0000] rounded-bl-xl text-white h-7 w-10 p-[3px]"
                onClick={handleDeleteModal}
            />
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF2F2]">
                  <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 text-red-600 animate-loader"
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 360 }}
                        transition={{
                        ease: "easeInOut",
                        duration: 2,
                        flip: Infinity,
                        repeatDelay: 1
        }}
                        >
                        <motion.path
                            variants={iconSvg}
                            initial="hidden"
                            animate="visible"
                            fillRule="evenodd"  // Corrected attribute
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"  // Corrected attribute
                        />
                    </motion.svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className=" font-semibold leading-6 text-[20px] text-indigo-900">
                        {header}
                    </Dialog.Title>
                    <div className="mt-2 font-inter text-justify  flex flex-col gap-2">
                        <h5 className="text-[17px]   text-black indent-[40px] ">
                             Are you sure you want to delete {" "}
                             <span className="text-error-400 text-center">
                                 {name}?
                             </span>
                         </h5>

                         <p className=" mt-4 bg-[#ffeeee] px-2 py-4 border-l-[3px] border-red-500">
                             <span className="font-semibold font-work-sans">Remainder: </span>This data will be permanently removed from
                             our servers forever. This action cannot be undone.
                         </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    disabled={processsing}
                    className="inline-flex w-full justify-center items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => handleConfirm(id)}
                  >
                    {processsing ? 
                        <ButtonLoader />
                        :
                        'Delete'
                    }
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={handleDeleteModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    );
};

export default DeleteToast;