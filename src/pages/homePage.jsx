import Header from "../components/header"
import Sidebar from "../components/sidebar"

export default function Home({ recentPosts }) {
    // get most recent post*
    return (
        <>
            <Header />
            <main>
                {/* display most recent post */}
                <div>
                    <h2>most recent article</h2>
                    <p>(first paragraph)</p>
                    <p>(link to view the rest of the post)</p>
                </div>
                <Sidebar recenPosts={recentPosts} />

            </main>
        </>
    )
};