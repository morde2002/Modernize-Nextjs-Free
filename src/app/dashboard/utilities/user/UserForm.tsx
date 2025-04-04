import React, { useState } from "react";
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Grid, Typography, Alert } from "@mui/material";
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import Cookies from 'js-cookie';

interface UserFormProps {
  onSuccess?: () => void; // Optional onSuccess prop
}

const UserForm: React.FC<UserFormProps> = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const roles = ["FleetManager", "Admin", "Driver", "Accountant", "Supervisor"];
  const departments = ["Operations", "Maintenance", "Finance", "Administration", "Logistics"];

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Data to send to backend for creating user
    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      department,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`, // Assume token is used for authentication
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user.");
      }

      const result = await response.json();
      setSuccess(result.message);
      // Execute onSuccess if provided
      if (onSuccess) onSuccess();
      // Redirect to a success page or user listing page
      router.push('/dashboard/users');
    } catch (error) {
      setError((error instanceof Error ? error.message : "An error occurred while creating the user."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>Create New User</Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
            >
              {roles.map((roleOption) => (
                <MenuItem key={roleOption} value={roleOption}>
                  {roleOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              fullWidth
            >
              {departments.map((deptOption) => (
                <MenuItem key={deptOption} value={deptOption}>
                  {deptOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Create User
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserForm;
