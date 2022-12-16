import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/' }),
    endpoints: builder => ({
        getScans: builder.query({
            query: () => 'scans',
        }),
        getScanById: builder.query({
            query: id => `scans/${id}`,
        }),
    }),
});

export const { useGetScansQuery, useGetScanByIdQuery } = api;
