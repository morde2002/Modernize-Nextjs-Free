'use client';

import { Box, Typography, Paper, Grid } from "@mui/material";
import { IUser } from './types';

interface Props {
  users: IUser[];
}

const UserList = ({ users }: Props) => {
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
