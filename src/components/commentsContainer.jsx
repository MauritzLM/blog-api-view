import { useParams } from "react-router-dom"
import dayjs from "dayjs";
import CommentForm from "./commentForm";
import CommentCard from "./commentCard";
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);


export default function CommentsContainer({ postComments, commentAdded, setCommentAdded, showForm, handleHideForm, handleShowForm }) {
    const { id } = useParams();

    if (showForm) {
        return (
            <>
                <section className="comments-section">
                    <h3>Comments</h3>
                    <div className="comments-container">{postComments?.map(comment => {
                        return <CommentCard comment={comment} key={comment._id} />
                    })}</div>
                    <button data-testid="hideform" className="hide-commentform" onClick={() => handleHideForm()}>Hide form</button>
                    <CommentForm id={id} commentAdded={commentAdded} setCommentAdded={setCommentAdded} />
                </section>
            </>
        )
    } else {
        return (
            <>
                <section className="comments-section">
                    <h3>Comments</h3>
                    <div className="comments-container">{postComments?.map(comment => {
                        return <CommentCard comment={comment} key={comment._id} />
                    })}</div>
                    <button data-testid="showform" className="show-commentform" onClick={() => handleShowForm()}>Post a comment</button>
                </section>
            </>
        )
    }
};