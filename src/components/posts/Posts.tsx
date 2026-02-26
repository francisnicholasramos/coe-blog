import PostList from './components/PostList';
import { useFetchBlogs } from '../../hooks/useFetchBlogs';

const Posts = () => {
  const { blogs, loading, error } = useFetchBlogs();

  return (
    <div>
      {/* mini header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Stories
          </h1>
          <p className="text-lg text-gray-600">
            Discover ideas, stories, and perspectives from writers around the world.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* loading  */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-3 text-gray-600">Loading posts...</span>
          </div>
        )}

        {/* error */}
        {error && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-red-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>

            <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong.</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* If not loading and no error, show the list of posts */}
        {!loading && !error && <PostList posts={blogs} loading={loading} />}
      </div>
    </div>
  );
}

export default Posts;
