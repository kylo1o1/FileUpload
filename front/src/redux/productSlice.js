import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    products :  [],
    _product:[]
}

const productSlice = createSlice({
    name:"productSlice",
    initialState,
    reducers:{
        getProducts :(state,actions)=>{
            state.products = actions.payload.products
        },
        editProduct :(state,actions)=>{
            const {newProduct} = actions.payload
            state.products = state.products.map((e)=>
                e._id === newProduct._id ? newProduct : e
            )
        }
    }
})

export const {getProducts,editProduct} = productSlice.actions

export default productSlice.reducer