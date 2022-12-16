/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sortField: 'disease',
    desc: true,
};

const snapshotAnalysisSlice = createSlice({
    name: 'snapshotAnalysis',
    initialState,
    reducers: {
        changeAnalysisSortField(state, action) {
            state.sortField = action.payload;
        },
        tolggleAnalysisSortOrder(state) {
            const { desc } = state;
            state.desc = !desc;
        },
    },
});

const { actions, reducer } = snapshotAnalysisSlice;
export const { changeAnalysisSortField, tolggleAnalysisSortOrder } = actions;
export default reducer;
