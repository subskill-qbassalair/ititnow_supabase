import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    distance: 750,
    priceLevel: 2,
    cuisineType: '',
    latitude: 48.867503,
    longitude: 2.363811,
}

export const filters = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDistance: (state, action: PayloadAction<number>) => {
            state.distance = action.payload
        },
        setPriceLevel: (state, action: PayloadAction<number>) => {
            state.priceLevel = action.payload
        },
        setCuisineType: (state, action: PayloadAction<string>) => {
            state.cuisineType = action.payload
        },
        setLatitude: (state, action: PayloadAction<number>) => {
            state.latitude = action.payload
        },
        setLongitude: (state, action: PayloadAction<number>) => {
            state.longitude = action.payload
        }
    }
})

export const { setDistance, setPriceLevel, setCuisineType, setLongitude, setLatitude } = filters.actions

export default filters.reducer
