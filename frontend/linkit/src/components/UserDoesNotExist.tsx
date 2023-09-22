import React from 'react';

interface UserNullProps {
  user: string;
}

const UserNull = ({ user }: UserNullProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white text-center">
      <p className="text-xl mb-4">
        User with username <span className="font-bold">{user}</span> does not exist.
      </p>
    </div>
  );
};

export default UserNull;
