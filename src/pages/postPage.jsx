import Sidebar from "../components/sidebar"
import CommentsContainer from "../components/comments"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import dayjs from "dayjs";

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

        // scroll to top 
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        getPost();
    }, [commentAdded, id]);


    return (
        <>
            <header>
                <Link to="/">Home</Link>
            </header>
            <main>
                <article>
                    <h1>{post ? post.title : 'Fetching title'} </h1>
                    <p>written by {post ? post.author : 'Fetching author'}</p>
                    <p>{post ? dayjs(post.date).format("D MMM YYYY") : 'Fetching date'}</p>

                    {post.body?.split("\n").map((paragraph, index) => {
                        return parse(`<p key=${index + 1}>${paragraph}</p>`)
                    })}
                    <CommentsContainer postComments={post.comments} commentAdded={commentAdded} setCommentAdded={setCommentAdded} />
                </article>
                <Sidebar recenPosts={recentPosts} />
            </main>
        </>
    )
};