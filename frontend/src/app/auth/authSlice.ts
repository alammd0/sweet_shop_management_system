import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../utils/types'

export interface userState {
    user : User | null
    token : string | null
}

const initialState: userState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
    token : localStorage.getItem("token") ? localStorage.getItem("token")! : null
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state, action : PayloadAction<User>) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setToken : (state, action : PayloadAction<string>) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
    },

    logOut : (state) => {
        state.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
        state.token = localStorage.getItem("token") ? localStorage.getItem("token")! : null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
  },
})

export const { setUser, setToken, logOut } = authSlice.actions

export default authSlice.reducer