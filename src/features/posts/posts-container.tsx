import React from "react";

import { postsApiSlice, Post } from "../api/postsApiSlice";

import PostItem from "./post-item";

const PostsContainer = () => {
    const { data: posts, error, isLoading, refetch } = postsApiSlice.useFetchAllPostsQuery(
        100,  //first parameter is the parameters for the request
        {
            // pollingInterval: 1000
        }
    );
    const [
        createPost,
        {
            data: createPostData,
            error: createPostError,
            isLoading: isCreatePostLoading
        }
    ] = postsApiSlice.useCreatePostMutation();
    const [updatePost, {}] = postsApiSlice.useUpdatePostMutation();
    const [deletePost, {}] = postsApiSlice.useDeletePostMutation();

    const handleCreate = async () => {
        const title = prompt() || "";

        await createPost({ title, body: title } as Post);
    }

    const handleUpdate = (post: Post) => {
        updatePost(post);
    }

    const handleDelete = (post: Post) => {
        deletePost(post.id);
    }

    return (
        <div>
            <div className="post-list">
                <button onClick={handleCreate}>Add new post</button>
                <button onClick={() => refetch()}>REFETCH</button>
                { isLoading && <h1>Loading...</h1> }
                { error && <h1>Error occurred during loading posts</h1> }
                {
                    posts?.map(post => (
                        <PostItem
                            key={post.id}
                            post={post}
                            update={handleUpdate}
                            remove={handleDelete}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default PostsContainer;
