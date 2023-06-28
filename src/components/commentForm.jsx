import { useState } from "react";

// add new comment form
export default function CommentForm({ id, commentAdded, setCommentAdded }) {

    // form values
    const initialFormValues = { author: "", body: "", question: "" };
    const [commentFormValues, setCommentFormValues] = useState({ ...initialFormValues });

    // form error messages

    const [authorError, setAuthorError] = useState("");
    const [bodyError, setBodyError] = useState("");
    const [questionError, setQuestionError] = useState("");

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
                    if (err.path === "securityQuestion") {
                        setQuestionError(err.msg)
                    }
                });
                return;
            };

            // reset form values state 
            setAuthorError("");
            setBodyError("");
            setQuestionError("");
            setCommentFormValues({ ...initialFormValues });

            // comment added state change to rerender post
            setCommentAdded(commentAdded + 1);
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <form className="comment-form" method="post" onSubmit={(e) => handleNewComment(e)} noValidate>
                <h3>Add new Comment</h3>

                <label htmlFor="commentAuthor">enter your name
                    <input type="text" name="commentAuthor" value={commentFormValues.author} onChange={(e) => setCommentFormValues({ ...commentFormValues, author: e.target.value })} />
                    <span>{commentFormValues.author ? "" : authorError}</span>
                </label>

                <label htmlFor="commentBody">Your comment
                    <textarea name="commentBody" value={commentFormValues.body} onChange={(e) => setCommentFormValues({ ...commentFormValues, body: e.target.value })} />
                    <span>{commentFormValues.body.length < 10 ? bodyError : ""}</span>
                </label>

                <label htmlFor="securityQuestion">What is 13 - 8 ? (security question)
                    <input type="text" name="securityQuestion" value={commentFormValues.question} onChange={(e) => setCommentFormValues({ ...commentFormValues, question: e.target.value })} />
                    <span>{questionError}</span>
                </label>

                <button>submit</button>
            </form>
        </>
    )
};