import { createSlice } from "@reduxjs/toolkit";

export const menu = createSlice({
    name: 'menu',
    initialState: {
        menuItem: [],
        menuCategory: [],
        selectedCategory: null,
        selectedSubCategory: null,
        cart: []
    },
    reducers: {
        updateMenuCategory: (state, action) => {
            let payload = action.payload.map((p) => ({
                    id: p.id,
                    name: p.description,
                    image: p.image,
                    subcategories: p.menubrand.map((sc) => ({id: sc.id, name: sc.description, image: sc.image}))
            }))
            state.menuCategory = payload
        },
        updateMenuItem: (state, action) => {
            state.menuItem = action.payload
        },
        updateSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        updateSelectedSubCategory: (state, action) => {
            state.selectedSubCategory = action.payload
        },
        updateCart: (state,action) => {
            state.cart = action.payload
        }
    }
})

export const { updateMenuItem, updateMenuCategory, updateSelectedCategory, updateSelectedSubCategory, updateCart } = menu.actions

export default menu.reducer