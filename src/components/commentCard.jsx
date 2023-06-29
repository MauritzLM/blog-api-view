import parse from "html-react-parser";
import dayjs from "dayjs";
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// card to display a comment
export default function CommentCard({ comment }) {
    return (
        <div data-testid="comment" className="comment-card">
            {parse(`<p>${comment.body}</p>`)}
            <p>- <span className="author">{comment.author}</span></p>
            <p className="comment-date">{dayjs(comment.timestamp).fromNow()}</p>
        </div>
    )
};