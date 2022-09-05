import { createSlice } from "@reduxjs/toolkit";

export const appstat = createSlice({
    name: 'appstat',
    initialState: {
        isLoading: true
    },
    reducers: {
        updateLoadingStatus: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { updateLoadingStatus } = appstat.actions

export default appstat.reducer