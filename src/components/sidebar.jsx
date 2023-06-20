import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <>
            <aside>
                <h2>Recent articles</h2>

                <Link to="/posts">Archives</Link>
            </aside>
        </>
    )
};