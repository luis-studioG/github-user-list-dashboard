import { Loader2, X } from "lucide-react";
import { useGitHubUserDetails } from "../hooks/useGithubUsers";

interface UserDetailsModalProps {
  username: string | null;
  onClose: () => void;
}

export const UserDetailsModal = ({ username, onClose }: UserDetailsModalProps) => {
    const { data: user, isLoading, error } = useGitHubUserDetails(username); 

    if (!username) return null;
    
    return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
              <p className="text-gray-600">Loading user details...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              Failed to load user details. Please try again.
            </div>
          )}

          {user && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-24 h-24 rounded-full ring-4 ring-gray-100"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {user.name || user.login}
                    </h3>
                    {user.site_admin && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-lg mb-1">@{user.login}</p>
                  {user.bio && (
                    <p className="text-gray-700 mt-3">{user.bio}</p>
                  )}
                </div>
              </div>


              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.public_repos}</div>
                  <div className="text-sm text-gray-600 mt-1">Repositories</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followers}</div>
                  <div className="text-sm text-gray-600 mt-1">Followers</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.following}</div>
                  <div className="text-sm text-gray-600 mt-1">Following</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gray-900 text-white text-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    )
}