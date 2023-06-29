
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ recentPosts }) {


    // create list item for each recent post*

    const postList = recentPosts?.map((post, index) => {
        return <li key={post._id + "-" + index}><Link to={`/posts/${post._id}`}>{post.title}</Link></li>
    });

    return (
        <>
            <aside>
                <h3><span>Recent articles</span></h3>
                <ul>{postList}</ul>

                <Link className="oldposts" to="/posts">View older posts</Link>
            </aside>
        </>
    )
};