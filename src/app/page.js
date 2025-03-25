'use client';

import Image from 'next/image';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: "url('/coverBg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment:"fixed",
      }}
    >
      {/* Foreground content */}
      <Box
        sx={{
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        {/* Mall logo */}
        <Image
          src="/mallLogo.png"
          alt="Mall of Muscat Logo"
          width={200}
          height={120}
          style={{ marginBottom: 20 }}

        />

        {/* Title Text */}
        <Box sx={{ width: "100%", maxWidth: 600, mb: 3 }}>
        <Image
          src="/cover.gif"
          alt="Endless Shopping, Dining and More"
          width={600}
          height={200}
          priority
          layout="responsive"
          style={{ cursor: 'pointer' }}
          onClick={() => { router.push("/stores")}}
        />
      </Box>

        {/* CTA image/button */}
        <Box mt={5}>
          <Image
            src="/searchNow.png"
            alt="Search Now"
            width={180}
            height={100}
            style={{ cursor: 'pointer' }}
            onClick={() => { router.push("/stores")}}
          />
        </Box>
      </Box>
    </Box>
  );
}
