import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchBar } from "./components/searchBar"
import { UserList } from "./components/userList";
import { useGitHubUsers, useSearchGitHubUsers } from "./hooks/useGithubUsers";
import { AlertCircle, Github } from "lucide-react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    data: usersData,   
    isLoading: isLoadingUsers,
    error: usersError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGitHubUsers();

  const {
    data: searchData,
    isLoading: isSearching,
  } = useSearchGitHubUsers(searchQuery);

  const displayUsers = useMemo(() => {
    if (searchQuery.trim()) {
      return searchData?.items || [];
    }
    return usersData?.pages.flatMap((page) => page) || [];
  }, [searchQuery, searchData, usersData]);

  const isLoading = searchQuery.trim() ? isSearching : isLoadingUsers;
  const showLoadMore = !searchQuery.trim();

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gray-900 p-2 rounded-lg">
                  <Github className="w-8 h-8 text-white" /> {/* Deprecated - change to svg instead */}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">GitHub Users List</h1>
                  <p className="text-gray-600 text-sm mt-1">
                    Try to find a user by typing their name or username.
                  </p>
                </div>
              </div>
            </div>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading && displayUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading users...</p>
            </div>
          )}

          {usersError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-900 font-semibold mb-1">Error loading users</h3>
                <p className="text-red-700">
                  {usersError instanceof Error ? usersError.message : 'An unexpected error occurred'}
                </p>
              </div>
            </div>
          )}

          {/* Main content goes here */}
          {!isLoading && displayUsers.length > 0 && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  {searchQuery.trim() ? (
                    <>
                      Found <span className="font-semibold text-gray-900">{searchData?.total_count || 0}</span> users matching "{searchQuery}"
                    </>
                  ) : (
                    <>
                      Showing <span className="font-semibold text-gray-900">{displayUsers.length}</span> users
                    </>
                  )}
                </p>
              </div>
              <UserList
                users={displayUsers}
                onLoadMore={showLoadMore ? fetchNextPage : undefined}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </>
          )}

          {!isLoading && displayUsers.length === 0 && searchQuery.trim() && (
            <div className="text-center py-20">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Github className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">Try again with a different username</p>
            </div>
          )}
        </main>
      </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App
