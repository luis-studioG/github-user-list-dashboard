import { useCallback, useEffect, useRef } from 'react';
import { UserCard } from './userCard';
import { Loader2 } from 'lucide-react';

interface UserListProps {
  users?: any | any[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export const UserList = ({
  users = [],
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: UserListProps) => {
   const observerRef = useRef<IntersectionObserver | null>(null);
   const loadMoreRef = useRef<HTMLDivElement | null>(null);
   
   const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage && onLoadMore) {
        onLoadMore();
        }
    },
    [hasNextPage, isFetchingNextPage, onLoadMore]
    );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No users found</p>
      </div>
    );
  }


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: any) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
       
       {onLoadMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading more users...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
