import { createSlice } from "@reduxjs/toolkit";

export const menu = createSlice({
    name: 'menu',
    initialState: {
        menuItem: [],
        menuCategory: [],
        selectedCategory: null,
        selectedSubCategory: null
    },
    reducers: {
        updateMenuCategory: (state, action) => {
            let payload = action.payload.map((p) => ({
                    id: p.id,
                    name: p.description,
                    subcategories: p.menu_brands.map((sc) => ({id: sc.id, name: sc.description}))
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
        }
    }
})

export const { updateMenuItem, updateMenuCategory, updateSelectedCategory, updateSelectedSubCategory } = menu.actions

export default menu.reducer