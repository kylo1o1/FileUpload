import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:[],
    isAuth : false,
}

const auth  = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        login:(state,actions)=>{
            const {user,isAuth} = actions.payload
            state.user =  user
            state.isAuth = isAuth
        },
        upProfile :(state,actions)=>{
            const {user} = actions.payload
            state.user = user
        }
    }
})

export const {login,    upProfile,  } = auth.actions
export default auth.reducer