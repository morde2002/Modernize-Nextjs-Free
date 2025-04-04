"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
import { FiEye, FiEyeOff, FiShield } from "react-icons/fi";

// components
import PageContainer from "@/app/dashboard/components/container/PageContainer";
import Logo from "@/app/dashboard/layout/shared/logo/Logo";

const Login2 = () => {
  const [formData, setFormData] = useState({ usr: "", pwd: "" });
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://test.logixfleetapp.com/api/method/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token 6ff54c38fd72811:45bd9ea31d13bf4`,
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        throw new Error("Incorrect credentials provided");
      }

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="LogixFleetFrontendLogin" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid container justifyContent="center" sx={{ height: "100vh" }}>
          <Grid item xs={12} sm={12} lg={4} xl={3} display="flex" alignItems="center">
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}>
              <Box display="flex" justifyContent="center" mb={2}>
                <Logo />
              </Box>

              <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <FiShield size={40} />
                <Typography variant="h5" mt={1}>Welcome Back</Typography>
                <Typography variant="body2" color="textSecondary" textAlign="center">
                  Enter your credentials to sign in
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                {error && (
                  <Typography color="error" textAlign="center" mb={2}>
                    {error}
                  </Typography>
                )}

                <TextField
                  fullWidth
                  label="Username"
                  name="usr"
                  value={formData.usr}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="pwd"
                  type={showPassword ? "text" : "password"}
                  value={formData.pwd}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
