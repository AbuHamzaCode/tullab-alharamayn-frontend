// src/components/Users.js
import React from 'react';
import { useUsers } from '../../react-query/user.query';

const Users = () => {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
