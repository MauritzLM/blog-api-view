
import { Link } from "react-router-dom";

export default function Sidebar({ recentPosts }) {

    // create list item for each recent post*
    const postList = recentPosts?.map((post, index) => {
        return <li key={post._id + "-" + index}><Link to={`/posts/${post._id}`}>{post.title}</Link></li>
    })

    return (
        <>
            <aside>
                <h3>Recent articles</h3>
                <ul>{postList}</ul>

                <Link to="/posts">Archives</Link>
            </aside>
        </>
    )
};