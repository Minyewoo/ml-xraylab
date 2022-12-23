import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_URL;

const transformSnapshotData = data => {
    const { conclusion, ...other } = data;
    const conclusionDict = JSON.parse(conclusion);

    delete conclusionDict['No Finding'];

    return {
        results: Object.keys(conclusionDict).map((key, idx) => ({
            id: idx,
            disease: key,
            probability: conclusionDict[key],
        })),
        ...other,
    };
};

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
        uploadSnapshot: builder.mutation({
            query: ({ data, token }) => ({
                url: '/home/upload_image',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        getSnapshots: builder.query({
            query: payload => ({
                url: '/home/user_snapshots',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
            }),
        }),
        getSnapshotById: builder.query({
            query: payload => ({
                url: `/home/user_snapshots/${payload.id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
            }),
            transformResponse: response => transformSnapshotData(response),
        }),
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useGetSnapshotsQuery,
    useGetSnapshotByIdQuery,
    useUploadSnapshotMutation,
} = api;
