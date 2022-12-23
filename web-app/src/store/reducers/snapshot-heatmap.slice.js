/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    visibility: true,
};

const snapshotHeatmapSlice = createSlice({
    name: 'snapshotHeatmap',
    initialState,
    reducers: {
        tolggleHeatmapVisibility(state) {
            const { visibility } = state;
            state.visibility = !visibility;
        },
    },
});

const { actions, reducer } = snapshotHeatmapSlice;
export const { tolggleHeatmapVisibility } = actions;
export default reducer;
