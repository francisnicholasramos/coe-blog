import { useEffect } from "react";
import { useSearchParams } from "react-router";
import Card from "./components/Card";
import SortItems from "./components/SortItems";
import { usePosts } from "./hooks/usePosts";
import { usePrivateSearch } from "./hooks/usePrivateSearch";
import Search from "./components/Search";

const DashBoard = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    
    const { posts: allPosts, isLoading: loadingPosts, error: errorPosts, fetchPosts } = usePosts();
    const { posts: searchResults, loading: loadingSearch, error: errorSearch } = usePrivateSearch(searchQuery);
    const isSearching = Boolean(searchQuery);
    const posts = isSearching ? searchResults : allPosts;
    const isLoading = isSearching ? loadingSearch : loadingPosts;
    const error = (isSearching ? errorSearch : errorPosts) || '';

    useEffect(() => {
        if (!isSearching) {
            fetchPosts();
        }
    }, [fetchPosts, isSearching]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <div 
                className="sm:flex block items-center space-y-2 justify-between max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4"
            >
                <SortItems fetchPosts={fetchPosts} />
                <Search />
            </div>
            <Card posts={posts} isLoading={isLoading} error={error} />
        </div>
    );
};
export default DashBoard;
