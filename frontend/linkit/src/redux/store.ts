import fetchLinkReducer from './features/fetchLinkSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        fetchLinkReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;