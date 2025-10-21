import { UserCard } from './userCard';

interface UserListProps {
  users?: any | any[];
}

export const UserList = ({
  users = [],
}: UserListProps) => {
    const list = Array.isArray(users)
        ? users
        : Array.isArray(users?.items)
        ? users.items
        : Array.isArray(users?.data)
        ? users.data
        : users
        ? [users]
        : [];

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
        {list[0].pages[0].map((user: any) => (
          <UserCard key={user.id ?? user.login} user={user} />
        ))}
      </div>
    </div>
  );
};
