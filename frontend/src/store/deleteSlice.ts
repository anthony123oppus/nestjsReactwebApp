import { createSlice } from "@reduxjs/toolkit";

interface initialDeleteProps {
    isDelete : boolean
    route : string
    id : number 
    name : string
    header : string
}

const initialDeleteState : initialDeleteProps = {isDelete: false, route : '', id : 0, name : '', header : ''}

const deleteSlice = createSlice({
    name : 'delete',
    initialState : initialDeleteState,
    reducers : {
        onDelete : (state,action) => {
            const payload = action.payload
            state.isDelete = true
            state.route = payload.route
            state.id = payload.id
            state.name = payload.name
            state.header = payload.header
        },
        onDeleteClose : (state) => {
            state.isDelete =  !state.isDelete
        }

    }
})

export const deleteSliceActions = deleteSlice.actions

export default deleteSlice.reducer