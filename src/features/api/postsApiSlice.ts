import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export interface Post {
    id: string;
    title: string;
    body: string;
}

export const postsApiSlice = createApi({
    reducerPath: "postsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/"
    }),
    tagTypes: ["Posts"],
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<Post[], number>({     // "Post[]" — returned type of query; second parameter "number" — type of input argument for this hook
            query: (limit: number = 5) => ({
                url: "/posts",   //this url is added to "baseUrl", resulting in "https://jsonplaceholder.typicode.com/posts" string
                params: {
                    _limit: limit
                }
            }),
            providesTags: (result) =>  ["Posts"]
        }),
        createPost: builder.mutation<Post, Post>({
            query: (post) => ({
                url: "/posts",
                method: "POST",
                body: post
            }),
            invalidatesTags: ["Posts"]
        }),
        updatePost: builder.mutation<Post, Post>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: "PUT",
                body: post
            }),
            invalidatesTags: ["Posts"]
        }),
        deletePost: builder.mutation<Post, string>({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Posts"]
        })
    })
});
