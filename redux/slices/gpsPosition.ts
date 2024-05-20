import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    latitude: 0,
    longitude: 0
}

export const gpsPosition = createSlice({
  name: 'gpsPosition',
    initialState,
    reducers: {
        setLatitude: (state, action) => {
            state.latitude = action.payload
        },
        setLongitude: (state, action) => {
            state.longitude = action.payload
        }
    }
})

export const { setLatitude, setLongitude } = gpsPosition.actions
export default gpsPosition.reducer
