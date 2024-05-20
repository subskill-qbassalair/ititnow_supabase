import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filters";
import gpsPosition from "./slices/gpsPosition";


export default configureStore({
    reducer: {
        filters,
        gpsPosition
    }
})
