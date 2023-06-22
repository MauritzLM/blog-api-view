import { useParams } from "react-router-dom"
import { useState } from "react";
import parse from "html-react-parser";
import dayjs from "dayjs";
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function CommentsContainer({ postComments, commentAdded, setCommentAdded }) {
    const { id } = useParams();

    return (
        <>
            <section className="comments-section">
                <h3>Comments</h3>
                <div className="comments-container">{postComments?.map(comment => {
                    return <CommentCard comment={comment} key={comment._id} />
                })}</div>
                <CommentForm id={id} commentAdded={commentAdded} setCommentAdded={setCommentAdded} />
            </section>
        </>
    )
};

// add new comment form
function CommentForm({ id, commentAdded, setCommentAdded }) {

    // how to rerender component when post gets updated? (error messages)*
    // form values
    const initialFormValues = { author: "", body: "", question: "" };
    const [commentFormValues, setCommentFormValues] = useState({ ...initialFormValues });

    // form error messages
    const initialErrorValues = { author: "", body: "", question: "" };
    const [errorValues, setErrorValues] = useState({ ...initialErrorValues })

    // handle new comment post*
    async function handleNewComment(event) {
        event.preventDefault();

        try {
            // get form data
            const form = event.target;
            const formData = new FormData(form);

            // fetch req
            const response = await fetch(`http://localhost:3001/posts/${id}`,
                {
                    method: form.method,
                    body: formData
                }
            );

            const data = await response.json();

            // errors
            if (data.errors) {
                data.errors.forEach(err => {
                    if (err.path === "commentAuthor") {
                        setErrorValues({ ...errorValues, author: err.msg });
                    }
                    if (err.path === "commentBody") {
                        setErrorValues({ ...errorValues, body: err.msg });
                    }
                    if (err.path === "securityQuestion") {
                        setErrorValues({ ...errorValues, question: err.msg });
                    }
                });
                return;
            };

            // success reload page?
            console.log(data);
            setErrorValues({ ...initialErrorValues });
            setCommentFormValues({ ...initialFormValues });
            setCommentAdded(commentAdded + 1);
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <form className="comment-form" method="post" onSubmit={(e) => handleNewComment(e)}>
                <h3>Add new Comment</h3>

                <label htmlFor="commentAuthor">enter your name
                    <input type="text" name="commentAuthor" value={commentFormValues.author} onChange={(e) => setCommentFormValues({ ...commentFormValues, author: e.target.value })}></input>
                    <span>{errorValues.author}</span>
                </label>

                <label htmlFor="commentBody">Your comment
                    <textarea name="commentBody" value={commentFormValues.body} onChange={(e) => setCommentFormValues({ ...commentFormValues, body: e.target.value })} />
                    <span>{errorValues.body}</span>
                </label>

                <label htmlFor="securityQuestion">What is 13 - 8 ? (security question)
                    <input type="text" name="securityQuestion" value={commentFormValues.question} onChange={(e) => setCommentFormValues({ ...commentFormValues, question: e.target.value })} />
                    <span>{errorValues.question}</span>
                </label>

                <button>submit</button>
            </form>
        </>
    )
};

// card to display a comment
function CommentCard({ comment }) {
    return (
        <div className="comment-card">
            {parse(`<p>${comment.body}</p>`)}
            <p>- {comment.author}</p>
            <p>{dayjs(comment.timestamp).fromNow()}</p>
        </div>
    )
};