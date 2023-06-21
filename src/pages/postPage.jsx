import Sidebar from "../components/sidebar"
import CommentsContainer from "../components/comments"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Post({ recentPosts }) {
    const { id } = useParams();
    const [post, setPost] = useState({});

    const [commentAdded, setCommentAdded] = useState(0);

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
    }, [commentAdded, id]);


    return (
        <>
            <header>
                <Link to="/">Home</Link>
            </header>
            <main>
                <article>
                    <h1>{post.title} </h1>
                    <p>written by {post.author}</p>

                    {post.body?.split("\n").map((paragraph, index) => {
                        return <p key={index + 1}>{paragraph}</p>
                    })}

                    {/* <p>{post.body}</p> */}
                    <CommentsContainer postComments={post.comments} commentAdded={commentAdded} setCommentAdded={setCommentAdded} />
                </article>
                <Sidebar recenPosts={recentPosts} />
            </main>
        </>
    )
};