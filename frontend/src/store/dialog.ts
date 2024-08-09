import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface dialogStateProps {
    isDialog : boolean
    header : string
    message : string
    type: string
    icon : ReactNode | null
}

const initialDialogState : dialogStateProps = {
    isDialog: false,
    header: "",
    message: "",
    type: "",
    icon : null,
};

const dialogSlice = createSlice({
    name: "dialog",
    initialState: initialDialogState,
    reducers: {
        onDialog: (state, action) => {
            const payload = action.payload;
            state.isDialog = true;
            state.header = payload.header;
            state.message = payload.message;
            state.type = payload.type;
            state.icon = payload.icon;
        },
        onDialogClose : (state) => {
            state.isDialog = false
        },
        onDialogToggle : (state) => {
            state.isDialog = !state.isDialog
        }
    },
});

export const dialogSliceActions = dialogSlice.actions

export default dialogSlice.reducer
