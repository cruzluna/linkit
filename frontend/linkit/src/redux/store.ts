import fetchLinkReducer from './features/fetchLinkSlice';
import { configureStore } from '@reduxjs/toolkit';
import booleanReducer  from "./features/booleanSlice"

export const store = configureStore({
    reducer: {
        fetchLinkReducer,
        boolean: booleanReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;