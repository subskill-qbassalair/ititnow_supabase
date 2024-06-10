import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    distance: 750,
    priceLevel: 2,
    cuisineType: 'Pizza',
    latitude: 48.867503,
    longitude: 2.363811
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
        },
        setLatitude: (state, action) => {
            state.latitude = action.payload
        },
        setLongitude: (state, action) => {
            state.longitude = action.payload
        }
    }
})

export const { setDistance, setPriceLevel, setCuisineType, setLongitude, setLatitude } = filters.actions

export default filters.reducer
