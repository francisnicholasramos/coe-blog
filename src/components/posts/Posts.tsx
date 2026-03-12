import { useSearchParams } from 'react-router';
import PostList from './components/PostList';
import { useFetchBlogs } from '../../hooks/useFetchBlogs';
import { useSearch } from '../../hooks/useSearch';
const Posts = () => {
    const [searchParams] = useSearchParams(); const searchQuery = searchParams.get('q') || '';
    
    const { blogs, loading: loadingBlogs, error: errorBlogs } = useFetchBlogs();
    const { posts: searchResults, loading: loadingSearch, error: errorSearch } = useSearch(searchQuery);
    const isSearching = Boolean(searchQuery);
    const posts = isSearching ? searchResults : blogs;
    const loading = isSearching ? loadingSearch : loadingBlogs;
    const error = isSearching ? errorSearch : errorBlogs;
    return (
        <div>
            {/* mini header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-9">
                    {isSearching ? (
                        <>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                Search Results
                            </h1>
                            <p className="text-lg text-gray-600">
                                Showing results for "{searchQuery}"
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                Latest Stories
                            </h1>
                            <p className="text-lg text-gray-600">
                                Discover ideas, stories, and perspectives from writers around the world.
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* error */}
                {error && (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 mx-auto text-red-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong.</h3>
                        <p className="text-gray-600">{error}</p>
                    </div>
                )}
                {!error && <PostList posts={posts} loading={loading} />}
            </div>
        </div>
    );
};
export default Posts;
