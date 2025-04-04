import React, { useEffect, useState } from "react";
import { Avatar, Box, Menu, Button, IconButton, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Use the new useRouter hook from next/navigation

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter(); // Using the new useRouter hook

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick2 = (event: any) => setAnchorEl2(event.currentTarget);
  const handleClose2 = () => setAnchorEl2(null);

  const handleLogout = () => {
    Cookies.remove("token"); // Remove auth token
    router.push('/authentication/login'); // Redirect to login
  };

  if (!isClient) {
    return null; // Optionally return a loader while waiting for the client-side render
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show notifications"
        color="inherit"
        onClick={handleClick2}
      >
        <Avatar
          src="#"
          alt="image"
          sx={{ width: 35, height: 35 }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl2}
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ "& .MuiMenu-paper": { width: "200px" } }}
      >
        <MenuItem>
          <ListItemIcon><IconUser width={20} /></ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon><IconMail width={20} /></ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon><IconListCheck width={20} /></ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
