import type { Post } from "../../../types";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";

interface PostListProps {
  posts: Post[]; 
  loading: boolean;
}

const PostList = ({ posts, loading }: PostListProps) => {
   if (loading) {
        return (
            <div className="divide-y divide-gray-100">
                {[...Array(5)].map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
            </div>
        );
    }
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <svg
                    className="w-16 h-16 mx-auto text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">Be the first to share your thoughts!</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-100">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} loading={loading} />
            ))}
        </div>
    );
}

export default PostList;
