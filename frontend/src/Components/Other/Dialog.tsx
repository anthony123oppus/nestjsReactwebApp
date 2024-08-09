import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { IoCloseSharp } from "react-icons/io5";

import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { dialogSliceActions } from "../../store/dialog";

import { motion } from "framer-motion";
import { iconSvg } from "../Functions/transistion";

export default function DialogToast() {
    // const [open, setOpen] = useState(true)

    const dispatch = useDispatch(); 

    const dialogToast = useSelector(
        (state: RootState) => ({
            isDialog: state.dialog.isDialog,
            // handleDialog: state.dialog.handleDialog,
            // onClose: state.dialog.onClose,
            icon: state.dialog.icon,
            type: state.dialog.type,
            header: state.dialog.header,
            message: state.dialog.message,
        }),
        shallowEqual
    );

    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (dialogToast.isDialog) {
            setProgress(100); // Reset progress when the component is opened
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress > 0) {
                        return prevProgress - 1;
                    } else {
                        clearInterval(interval);
                        dispatch(dialogSliceActions.onDialogClose());
                        // dialogToast.onClose(); // Close the dialog when progress reaches 0
                        return 0;
                    }
                });
            }, 40);

            return () => clearInterval(interval);
        }
    }, [dialogToast.isDialog, dispatch]);


    

    const handleDispatchClose = () => {
        dispatch(dialogSliceActions.onDialogToggle());
    };

    return (
        <Transition.Root show={dialogToast.isDialog} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[1000]"
                onClose={handleDispatchClose}
            >
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
                            <Dialog.Panel
                                className={`relative  ${
                                    dialogToast.type === "success"
                                        ? "border-[#065f46]"
                                        : dialogToast.type === "error"
                                        ? "border-[#991b1b]"
                                        : "border-[#033AA9]"
                                } border-[1px] transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6`}
                            >
                                <IoCloseSharp
                                    className="absolute top-0 right-0 bg-[#ff0000] rounded-bl-xl text-white h-7 w-10 p-[3px]"
                                    onClick={handleDispatchClose}
                                />
                                <div>
                                    <div
                                        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                                            dialogToast.type === "success"
                                                ? "bg-[#F0FDF4]"
                                                : dialogToast.type === "error"
                                                ? "bg-[#FEF2F2]"
                                                : "text-[#021f5b]"
                                        } `}
                                    >
                                        <div
                                            className={`h-8 w-8 ${
                                                dialogToast.type === "success"
                                                    ? "text-green-600"
                                                    : dialogToast.type ===
                                                      "error"
                                                    ? "text-[#dc2626]"
                                                    : "text-[#021f5b]"
                                            }`}
                                        >
                                            {/* {dialogToast.icon} */}
                                            {dialogToast.type === "success" ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    className="w-8 h-8"
                                                >
                                                    <motion.path
                                                        variants={iconSvg}
                                                        initial="hidden"
                                                        animate="visible"
                                                        // stroke-linecap="round"
                                                        // stroke-linejoin="round"
                                                        d="m4.5 12.75 6 6 9-13.5"
                                                    />
                                                </svg>
                                            ) : dialogToast.type === "error" ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 30 30"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    className="w-10 h-10"
                                                >
                                                    <motion.path
                                                        variants={iconSvg}
                                                        initial="hidden"
                                                        animate="visible"
                                                        // stroke-linecap="round"
                                                        // stroke-linejoin="round"
                                                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth="2"
                                                  stroke="currentColor"
                                                  className="w-8 h-8"
                                                >
                                                    <motion.path
                                                        variants={iconSvg}
                                                        initial="hidden"
                                                        animate="visible"
                                                        // stroke-linecap="round"
                                                        // stroke-linejoin="round"
                                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-[25px] font-semibold leading-6 text-blue-900"
                                        >
                                            {/* {dialogToast.type === 'success' ? 'Success' : dialogToast.type === 'error' ? 'Error' : 'text-shades-300'} */}
                                            {dialogToast.header}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-blue-500">
                                                {dialogToast.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={handleDispatchClose}
                                    >
                                        Close
                                    </button>
                                </div>
                                <div
                                    className={` absolute bottom-0 left-0 w-full h-[4px] ${
                                        dialogToast.type === "success"
                                            ? "bg-[#059669]"
                                            : dialogToast.type === "error"
                                            ? "bg-[#dc2626]"
                                            : "bg-[#021f5b]"
                                    }`}
                                    style={{ width: `${progress}%` }}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}