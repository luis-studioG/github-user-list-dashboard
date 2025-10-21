const USERS_PER_PAGE = 30;
const baseURL = import.meta.env.VITE_GITHUB_API_BASE;

export const fetchGitHubUsers = async (since: number = 0): Promise<any[]> => {
  const response = await fetch(
    `${baseURL}/users?since=${since}&per_page=${USERS_PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  return response.json();
};

export const searchGitHubUsers = async (query: string, page: number = 1): Promise<{ items: any[]; total_count: number }> => {
  if (!query.trim()) {
    return { items: [], total_count: 0 };
  }

  const response = await fetch(
    `${baseURL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${USERS_PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error(`Failed to search users: ${response.statusText}`);
  }

  return response.json();
};
