import { createSlice } from "@reduxjs/toolkit";

export const appstat = createSlice({
    name: 'appstat',
    initialState: {
        isLoading: true,
        sidebarVisibility: true,
    },
    reducers: {
        updateSideBarVisibility: (state, action) => {
            state.sidebarVisibility = action.payload
        },
        updateLoadingStatus: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { updateSideBarVisibility, updateLoadingStatus } = appstat.actions

export default appstat.reducer