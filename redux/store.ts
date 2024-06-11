import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filters";
import restaurants from "./slices/restaurants";


export default configureStore({
    reducer: {
        filters,
        restaurants,
    }
})
