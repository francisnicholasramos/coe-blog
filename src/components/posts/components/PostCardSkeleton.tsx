import { Skeleton } from "@heroui/react";
const PostCardSkeleton = () => {
    return (
        <div className="py-6">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-48" />
        </div>
    );
};
export default PostCardSkeleton;
