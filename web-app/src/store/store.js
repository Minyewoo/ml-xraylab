import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'services/api';
// import { authApi } from 'services/auth-api';
import snapshotAnalysisReducer from './reducers/snapshot-analysis.slice';
import snapshotHeatmapReducer from './reducers/snapshot-heatmap.slice';

// TODO: add constants for reducer names
const store = configureStore({
    reducer: {
        snapshotAnalysis: snapshotAnalysisReducer,
        snapshotHeatmap: snapshotHeatmapReducer,
        [api.reducerPath]: api.reducer,
        // [authApi.reducerPath]: authApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
