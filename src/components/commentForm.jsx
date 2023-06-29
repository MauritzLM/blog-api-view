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

    // handle new comment post
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
            <form data-testid="commentForm" className="comment-form" method="post" onSubmit={(e) => handleNewComment(e)} noValidate>
                <h3>Post new Comment</h3>

                <label htmlFor="commentAuthor">enter your name
                    <input data-testid="author" type="text" name="commentAuthor" value={commentFormValues.author} onChange={(e) => setCommentFormValues({ ...commentFormValues, author: e.target.value })} />
                    <span data-testid="errormsg">{commentFormValues.author ? "" : authorError}</span>
                </label>

                <label htmlFor="commentBody">Your comment
                    <textarea data-testid="body" name="commentBody" value={commentFormValues.body} onChange={(e) => setCommentFormValues({ ...commentFormValues, body: e.target.value })} />
                    <span data-testid="errormsg">{commentFormValues.body.length < 10 ? bodyError : ""}</span>
                </label>

                <label htmlFor="securityQuestion">What is 13 - 8 ? (security question)
                    <input data-testid="question" type="text" name="securityQuestion" value={commentFormValues.question} onChange={(e) => setCommentFormValues({ ...commentFormValues, question: e.target.value })} />
                    <span data-testid="errormsg">{questionError}</span>
                </label>

                <button data-testid="submit">post comment</button>
            </form>
        </>
    )
};