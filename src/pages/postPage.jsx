import Sidebar from "../components/sidebar"
import CommentsContainer from "../components/commentsContainer"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import dayjs from "dayjs";

export default function Post({ recentPosts }) {
    const { id } = useParams();
    const [post, setPost] = useState({});

    const [commentAdded, setCommentAdded] = useState(0);

    // add state to hide form
    const [showForm, setShowForm] = useState(false);

    // handle post comment button
    function handleShowForm() {
        setShowForm(true);
    };

    // handle hide form
    function handleHideForm() {
        setShowForm(false);
    };

    // fetch post by id
    useEffect(() => {
        async function getPost() {
            try {
                const response = await fetch(`http://localhost:3001/posts/${id}`, {
                    method: 'GET',
                });

                const post = await response.json();

                // save post in state
                setPost({ ...post });

                // hide comment form
                setShowForm(false);
            }
            catch (error) {
                console.log(error)
            }
        };

        // scroll to top 
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        getPost();
    }, [commentAdded, id]);

    // add scroll to bottom functionality*
    // useEffect(() => {
    //     // 👇️ scroll to bottom every time messages change
    //     showForm?.scrollIntoView({ behavior: 'smooth' });
    // }, [showForm]);

    return (
        <>
            <header>
                <Link to="/">Home</Link>
            </header>
            <main>
                <article>
                    <h1 data-testid="title">{post ? post.title : 'Fetching title'} </h1>
                    <p>written by <span className="author">{post ? post.author : 'Fetching author'}</span></p>
                    <p className="date">published {post ? dayjs(post.date).format("D MMM YYYY") : 'Fetching date'}</p>

                    {post.body?.split("\n").map((paragraph, index) => {
                        return parse(`<p key=${index + 1}>${paragraph}</p>`)
                    })}
                    <CommentsContainer postComments={post.comments} commentAdded={commentAdded} setCommentAdded={setCommentAdded} showForm={showForm} handleShowForm={handleShowForm} handleHideForm={handleHideForm} />
                </article>
                <Sidebar recentPosts={recentPosts} />
            </main>
        </>
    )
};