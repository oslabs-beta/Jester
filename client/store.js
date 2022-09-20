import { configureStore } from '@reduxjs/toolkit';
import middleReducer from './middleSlice'

export const store = configureStore({
    reducer: {
        middle: middleReducer,
    },
})