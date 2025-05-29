"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [language, setLanguage] = useState("en");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    router.push("/cms");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}
    >
      {/* Left Side Image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url("/login.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Side Login */}
      <Box
  sx={{
    flex: 1,
    px: { xs: 4, md: 8 },
    py: { xs: 6, md: 10 },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", 
    backgroundColor: "#fff",
  }}
>
  {/* Logo */}
  <Box sx={{ textAlign: "center", mt: 2 }}>
    <Image
      src="/mallLogo.png"
      alt="Mall of Muscat Logo"
      width={400}
      height={200}
      style={{ objectFit: "contain" }}
    />
  </Box>

  {/* Form */}
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      maxWidth: "400px",
      mx: "auto",
      width: "100%",
    }}
  >
    <TextField
      fullWidth
      label="Username"
      name="email"
      value={form.email}
      onChange={handleChange}
      error={!!errors.email}
      helperText={errors.email}
    />
    <TextField
      fullWidth
      label="Password"
      name="password"
      type={showPassword ? "text" : "password"}
      value={form.password}
      onChange={handleChange}
      error={!!errors.password}
      helperText={errors.password}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: "#222",
        "&:hover": { backgroundColor: "#000" },
        textTransform: "none",
        color: "#fff",
        mt: 1,
      }}
    >
      Login
    </Button>
  </Box>

  {/* Language Switch */}
  <Stack
    direction="row"
    spacing={2}
    justifyContent="center"
    sx={{ mb: 2 }}
  >
    <Button
      size="small"
      variant="contained"
      onClick={() => setLanguage("ar")}
      sx={{
        textTransform: "none",
        bgcolor: language === "ar" ? "#000" : "#e0e0e0",
        color: language === "ar" ? "#fff" : "#000",
        "&:hover": {
          bgcolor: language === "ar" ? "#111" : "#d0d0d0",
        },
      }}
    >
      العربية
    </Button>
    <Button
      size="small"
      variant="contained"
      onClick={() => setLanguage("en")}
      sx={{
        textTransform: "none",
        bgcolor: language === "en" ? "#000" : "#e0e0e0",
        color: language === "en" ? "#fff" : "#000",
        "&:hover": {
          bgcolor: language === "en" ? "#111" : "#d0d0d0",
        },
      }}
    >
      English
    </Button>
  </Stack>
</Box>

    </Box>
  );
}
