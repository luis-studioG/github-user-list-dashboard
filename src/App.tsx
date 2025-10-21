import { Github } from "lucide-react"
import { SearchBar } from "./components/searchBar"
import { useState } from "react";
import { UserList } from "./components/userList";
import { useGitHubUsers } from "./hooks/useGithubUsers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

    const { data: usersData } = useGitHubUsers();
    console.log('App usersData:', usersData);

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
              onChange={() => setSearchQuery(searchQuery)}
              onClear={() => setSearchQuery('')}
            />
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main content goes here */}
          <UserList users={usersData as any} />
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
