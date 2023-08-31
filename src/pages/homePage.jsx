import { Link } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function Home({ recentPosts }) {

    if (recentPosts.length) {
        // get most recent post
        const mostRecentPost = recentPosts[0];

        // get 2nd most recent post
        const secondMostRecentPost = recentPosts[1];
        return (
            <>
                <Header />
                <main>

                    <div>
                        <div>
                            <h2>{mostRecentPost.title}</h2>
                            <p>by <span className="author">{mostRecentPost.author}</span></p>
                            <p>{mostRecentPost.body.split("\n")[0]}</p>
                            <Link to={`/posts/${mostRecentPost._id}`}>Continue reading</Link>
                        </div>

                        <div>
                            <h2>{secondMostRecentPost.title}</h2>
                            <p>by <span className="author">{mostRecentPost.author}</span></p>
                            <p>{secondMostRecentPost.body.split("\n")[0]}</p>
                            <Link to={`/posts/${secondMostRecentPost._id}`}>Continue reading</Link>
                        </div>
                    </div>
                    <Sidebar recentPosts={recentPosts} />

                </main>
            </>
        )
    } else {
        return (
            <>
                <Header />

                <main>
                    <h1>Fetching Posts ...</h1>
                </main>

            </>
        )
    }
};