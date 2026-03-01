import {Link} from "react-router";
import type { CardProps } from '../hooks/usePosts';
import {formatDate} from "../utils/formatDate";
import {helpers} from "../../../utils/helpers";

const Card = ({ posts, isLoading, error }: CardProps) => {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-500 dark:text-zinc-400">No posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className="block bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                  {post.title}
                </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3">
                        {helpers.stripHtml(post.content).substring(0, 150)}
                        {post.content.length > 150 ? '...' : ''}
                    </p>
                <time className="text-xs text-zinc-400 dark:text-zinc-500 mt-4 block">
                  {formatDate(new Date(post.createdAt))}
                </time>
              </Link>
            ))}
          </div>
        )}
      </main>
    )
}

export default Card;
