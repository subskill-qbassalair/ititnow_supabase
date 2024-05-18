import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filters";


export default configureStore({
    reducer: {
        filters,
    }
})
