import { Link } from "react-router-dom"

export default function Sidebar() {
    // get 5 most recent posts*
    return (
        <>
            <aside>
                <h3>Recent articles</h3>
                <p>(display recent articles)</p>

                <Link to="/posts">Archives</Link>
            </aside>
        </>
    )
};