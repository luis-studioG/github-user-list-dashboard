import type { GitHubUser } from '../types/github';
import { User as UserIcon } from 'lucide-react';

interface UserCardProps {
  user: GitHubUser;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 group">
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-gray-200 transition-all"
            loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user.login}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
            <UserIcon className="w-3.5 h-3.5" />
            <span>ID: {user.id}</span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
            {user.type}
          </span>
        </div>
      </div>
    </div>
  );
};
