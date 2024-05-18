import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    distance: 750,
    priceLevel: 2,
    cuisineType: 'Pizza'
}

export const filters = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDistance: (state, action) => {
            state.distance = action.payload
        },
        setPriceLevel: (state, action) => {
            state.priceLevel = action.payload
        },
        setCuisineType: (state, action) => {
            state.cuisineType = action.payload
        }
    }
})

export const { setDistance, setPriceLevel, setCuisineType } = filters.actions

export default filters.reducer
