const USERS_PER_PAGE = 30;

export const fetchGitHubUsers = async (since: number = 0): Promise<any[]> => {
  const baseURL = import.meta.env.VITE_GITHUB_API_BASE;
  const response = await fetch(
    `${baseURL}/users?since=${since}&per_page=${USERS_PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  return response.json();
};