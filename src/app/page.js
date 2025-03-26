"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/coverBg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        px: 2,
      }}
    >
      {/* Foreground content */}
      <Box
        sx={{
          textAlign: "center",
          zIndex: 1,
          width: "100%",
          mx: "auto",
        }}
      >
        {/* Mall logo */}
        <Box sx={{ width: { xs: "40%", sm: "25%", md: "20%" }, mx: "auto", mt: 4 }}>
          <Image
            src="/mallLogo.png"
            alt="Mall of Muscat Logo"
            width={200}
            height={130}
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        {/* Title GIF */}
        <Box
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%" },
            mx: "auto",
            cursor: "pointer",
          }}
          onClick={() => router.push("/stores")}
        >
          <Image
            src="/cover.gif"
            alt="Explore Endless Shopping, Dining and More"
            width={600}
            height={200}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        {/* CTA Button Image */}
        <Box
          sx={{
            width: { xs: "60%", sm: "40%", md: "30%" },
            mx: "auto",
            cursor: "pointer",
            mb:2
          }}
          onClick={() => router.push("/stores")}
        >
          <Image
            src="/searchNow.png"
            alt="Search Now"
            width={300}
            height={130}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
