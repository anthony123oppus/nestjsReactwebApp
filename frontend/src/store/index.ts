import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import dialog from './dialog';
import deleteSlice from "./deleteSlice";

const rootReducer = combineReducers({
    AuthSlice,
    dialog,
    deleteSlice
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer :{AuthSlice, dialog, deleteSlice}
})

export default store