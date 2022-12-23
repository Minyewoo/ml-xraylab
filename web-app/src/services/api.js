import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = 'http://localhost:3030/';
const baseUrl = 'http://localhost:5090/';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        signUp: builder.mutation({
            query: payload => ({
                url: '/register',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        signIn: builder.mutation({
            query: payload => ({
                url: '/login',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        getScans: builder.query({
            query: () => 'scans',
        }),
        getScanById: builder.query({
            query: id => `scans/${id}`,
        }),
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useGetScansQuery,
    useGetScanByIdQuery,
} = api;
