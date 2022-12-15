import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/' }),
    endpoints: builder => ({
        getScans: builder.query({
            query: () => 'scans',
        }),
    }),
});

export const { useGetScansQuery } = api;
