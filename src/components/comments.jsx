
export default function CommentsContainer({ postComments }) {
    // handle new comment post*

    return (
        <>
            <h3>Comments</h3>
            <div>{postComments?.map(comment => {
                return <CommentCard comment={comment} key={comment._id} />
            })}</div>
            <CommentForm />
        </>
    )
};

// add new comment form
function CommentForm() {
    return (
        <>
            <form>
                <h3>Add new Comment</h3>
                <label htmlFor="newComment">
                    <textarea name="newComment" />
                </label>

                <button>submit</button>
            </form>
        </>
    )
};

// card to display a comment
function CommentCard({ comment }) {
    return (
        <div>
            <p>{comment.body}</p>
        </div>
    )
};