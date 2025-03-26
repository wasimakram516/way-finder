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
      }}
    >
      {/* Foreground content */}
      <Box
        sx={{
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {/* Mall logo */}
        <Box sx={{ width: "10vw", mx: "auto" }}>
          <Image
            src="/mallLogo.png"
            alt="Mall of Muscat Logo"
            width={200}
            height={130}
            priority
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>

        {/* Title Text */}
        <Box sx={{ width: "90vw", mb: 2, mx: "auto" }}>
          <Image
            src="/cover.gif"
            alt="Endless Shopping, Dining and More"
            width={600}
            height={200}
            priority
            style={{
              width: "100%",
              height: "auto",
              cursor: "pointer",
            }}
            onClick={() => router.push("/stores")}
          />
        </Box>

        {/* CTA image/button */}
        <Box sx={{ width: "20vw", mb: 2, mx: "auto" }}>
          <Image
            src="/searchNow.png"
            alt="Search Now"
            width={200}
            height={130}
            priority
            style={{
              width: "100%",
              height: "auto",
              cursor: "pointer",
            }}
            onClick={() => router.push("/stores")}
          />
        </Box>
      </Box>
    </Box>
  );
}
