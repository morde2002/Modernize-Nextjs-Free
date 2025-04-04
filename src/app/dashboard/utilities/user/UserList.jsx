'use client';

import { Box, Typography, Paper, Grid } from "@mui/material";

// Define the expected shape of the 'users' prop in comments or PropTypes if needed
// users: Array<{ firstName: string; lastName: string; email: string; phoneNumber: string; role: string; department: string; }>

const UserList = ({ users }) => {
  if (!users.length) return <Typography>No users found.</Typography>;

  return (
    <Grid container spacing={2}>
      {users.map((user, idx) => (
        <Grid item xs={12} key={idx}>
          <Paper sx={{ p: 2 }}>
            <Typography><strong>{user.firstName} {user.lastName}</strong></Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.phoneNumber}</Typography>
            <Typography>Role: {user.role}</Typography>
            <Typography>Dept: {user.department}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;
