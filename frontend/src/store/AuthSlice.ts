import { createSlice } from "@reduxjs/toolkit";

interface userTypes {
    id: number
  username: string
  createdAt: string
  devInfo: {
    id: string
    firstName: string
    middleName: string
    lastName: string
    age: number
    birthDate: string
    gender: string
    devMotto: string
    devImage: string
    createdAt: string
  }
  iat: number
  exp: number
}

interface initialAuthStateProps {
    isAuth : boolean,
    user : userTypes | null
    accessToken: string | null;
    refreshToken: string | null;
}

const initialAuthState : initialAuthStateProps = {isAuth : false, user : null, accessToken: null, refreshToken: null,}

const authSlice = createSlice({
    name : 'Authentication',
    initialState : initialAuthState,
    reducers : {
        authenticate : (state, action ) => {
            if(action.payload){
                state.isAuth = true
                state.user = action.payload
            }
        },
        logout : (state) => {
            state.isAuth =  false
            state.user = null
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    }
})

export const authSliceActions = authSlice.actions

export default authSlice.reducer