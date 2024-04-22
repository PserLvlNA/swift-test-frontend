import { configureStore } from "@reduxjs/toolkit"
import personReducer from "./features/persons/personsSlice"

export const store = configureStore({
    reducer: {
        persons: personReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch