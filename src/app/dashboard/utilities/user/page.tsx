'use client';

import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import UserList from './UserList'; // Ensure UserList.tsx exists in the same directory or adjust the path
import UserForm from './UserForm';

const UsersPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">User Management</Typography>
        <Button variant="contained" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Back to List' : 'Create User'}
        </Button>
      </Box>

      {showForm ? (
        <UserForm onSuccess={() => setShowForm(false)} />
      ) : (
        <UserList users={users} />
      )}
    </Box>
  );
};

export default UsersPage;
