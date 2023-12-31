import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export default function AllPosts() {
    const [posts, setPosts] = useState([]);

    // fetch all posts
    useEffect(() => {
        async function getAllPosts() {
            try {
                const response = await fetch('http://localhost:3001/posts',
                    { method: 'GET' });

                const posts = await response.json();

                setPosts([...posts]);
            }
            catch (error) {
                console.log(error);
            }
        };

        getAllPosts();
    }, []);

    // render list of posts
    const postsDisplay = posts?.map(post => {
        return <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            <p >by <span className="author">{post.author}</span></p>
        </li>
    });

    return (
        <>
            <header>
                <Link to="/">Home</Link>
            </header>
            <main>
                <div>
                    <h2>All articles</h2>
                    <ul className="post-list">{postsDisplay}</ul>
                </div>
            </main>
        </>
    )
};