import { useParams } from "react-router-dom"
import dayjs from "dayjs";
import CommentForm from "./commentForm";
import CommentCard from "./commentCard";
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