import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGitHubUsers } from '../services/github';

export const useGitHubUsers = () => {
  return useInfiniteQuery({
    queryKey: ['github-users'],
    queryFn: ({ pageParam = 0 }) => fetchGitHubUsers(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].id;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};