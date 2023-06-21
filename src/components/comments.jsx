import { useParams } from "react-router-dom"
import { useState } from "react";
import parse from "html-react-parser";

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
    // form values
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentBody, setCommentBody] = useState('');
    // form error messages
    const [authorError, setAuthorError] = useState('');
    const [bodyError, setBodyError] = useState('');

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
                        setAuthorError(err.msg);
                    }
                    if (err.path === "commentBody") {
                        setBodyError(err.msg);
                    }
                });
                return;
            };

            // success reload page?
            console.log(data);
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
                    <input type="text" name="commentAuthor" value={commentAuthor} onChange={(e) => setCommentAuthor(e.target.value)}></input>
                    <span>{authorError}</span>
                </label>

                <label htmlFor="commentBody">Your comment
                    <textarea name="commentBody" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
                    <span>{bodyError}</span>
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
        </div>
    )
};