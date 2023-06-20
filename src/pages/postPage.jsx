import Sidebar from "../components/sidebar"
import CommentsContainer from "../components/comments"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});

    // fetch post by id
    useEffect(() => {
        async function getPost() {
            try {
                const response = await fetch(`http://localhost:3001/posts/${id}`, {
                    method: 'GET',
                });

                const post = await response.json();

                setPost({ ...post });
            }
            catch (error) {
                console.log(error)
            }
        };

        getPost();
    }, []);


    return (
        <>
            <header>
                <Link to="/">Home</Link>
            </header>
            <main>
                <article>
                    <h1>{post.title}</h1>

                    {/* format body correctly */}
                    <p>{post.body}</p>
                    <CommentsContainer postComments={post.comments} />
                </article>
                <Sidebar />
            </main>
        </>
    )
};