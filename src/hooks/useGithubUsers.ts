import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchGitHubUserDetails, fetchGitHubUsers, searchGitHubUsers } from '../services/github';

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

export const useSearchGitHubUsers = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['github-users-search', query, page],
    queryFn: () => searchGitHubUsers(query, page),
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGitHubUserDetails = (username: string | null) => {
  return useQuery({
    queryKey: ['github-user', username],
    queryFn: () => fetchGitHubUserDetails(username!),
    enabled: !!username,
    staleTime: 10 * 60 * 1000,
  });
};
