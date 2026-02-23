import {useEffect} from "react";
import Card from "./components/Card";
import {usePosts} from "./hooks/usePosts";

const DashBoard= () => {
    const {posts, isLoading, error, fetchPosts} = usePosts();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);
  
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <Card posts={posts} isLoading={isLoading} error={error}/>
        </div>
    );
}

export default DashBoard;
