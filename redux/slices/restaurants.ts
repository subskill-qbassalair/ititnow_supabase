import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurants: [],

}

export const restaurants = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setRestaurants: (state, action) => {
            state.restaurants = action.payload
        }
    }
})

export const { setRestaurants } = restaurants.actions

export default restaurants.reducer
