import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'services/api';

// TODO: add constants for reducer names
const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
