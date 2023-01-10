import React, { FC } from 'react';

import { Post } from "../api/postsApiSlice";

interface PostItemProps {
    post: Post;
    update: (post: Post) => void;
    remove: (post: Post) => void;
}

const PostItem: FC<PostItemProps> = ({ post, update, remove }) => {
    const handleUpdate = (event: React.MouseEvent) => {
        const title = prompt() || "";

        update({ ...post, title })
    };

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation();

        remove(post);
    };

    return (
        <div className={"post"} onClick={handleUpdate}>
            {post.id}. {post.title}
            <button onClick={handleRemove}>Delete</button>
        </div>
    );
};

export default PostItem;