"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Chip,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { categories } from "@/data/categories";

export default function WayFinder() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    setDrawerOpen(false);
  };

  const handlePlayVideo = () => {
    if (selectedStore?.video && selectedStore.video.trim() !== "") {
      setVideoSrc(selectedStore.video);
      setVideoOpen(true);
    } else {
      setVideoSrc(null);
      setVideoOpen(false);
    }
    setSelectedStore(null);
  };

  const handleCloseVideo = () => {
    setVideoOpen(false);
    setVideoSrc(null);
  };

  return (
    <>
      {/* Main Layout */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Zoomable Map or Video */}
        <TransformWrapper>
          <TransformComponent>
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                backgroundImage: videoOpen
                  ? undefined
                  : "url('/mapBigHere.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                bgcolor: "black",
                display: videoOpen ? "none" : "block",
              }}
            />
          </TransformComponent>
        </TransformWrapper>

        {/* Open Drawer Button */}
        {!drawerOpen && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 999,
              backgroundColor: "#c8b783",
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Drawer */}
        {drawerOpen && (
          <Box
            sx={{
              position: "absolute",
              top: { xs: "5%", sm: "8%", md: "10%" },
              left: { xs: "5%", sm: "5%", md: "5%" },
              width: { xs: "90vw", sm: 300, md: 320 },
              maxHeight: "90vh",
              bgcolor: "primary.main",
              borderRadius: 2,
              boxShadow: 6,
              zIndex: 1000,
              p: 2,
              overflowY: "auto",
            }}
          >
            {/* Header with Close Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="h5" color="black">
                Stores
              </Typography>
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{ color: "black" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Search Box */}
            <TextField
              fullWidth
              placeholder="Search store..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ my: 2, bgcolor: "white", borderRadius: 1 }}
            />

            {/* Category List */}
            <Box>
              {searchTerm.trim() === ""
                ? categories.map((category) => (
                    <Accordion key={category.id} sx={{ bgcolor: "#c8b783" }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight="bold">
                          {category.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {category.stores.map((store, index) => (
                            <Box key={store.id}>
                              <ListItemButton
                                sx={{ p: 2 }}
                                onClick={() => handleStoreClick(store)}
                              >
                                {store.name}
                              </ListItemButton>
                              {index < category.stores.length - 1 && (
                                <Divider />
                              )}
                            </Box>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))
                : (() => {
                    const filteredStores = categories
                      .flatMap((category) => category.stores)
                      .filter((store) =>
                        store.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      );

                    return (
                      <List dense sx={{ bgcolor: "#c8b783", borderRadius: 1 }}>
                        {filteredStores.map((store, index) => (
                          <Box key={store.id}>
                            <ListItemButton
                              sx={{ p: 2 }}
                              onClick={() => handleStoreClick(store)}
                            >
                              {store.name}
                            </ListItemButton>
                            {index < filteredStores.length - 1 && <Divider />}
                          </Box>
                        ))}
                      </List>
                    );
                  })()}
            </Box>
          </Box>
        )}

        {/* Mall Logo */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 999,
          }}
        >
          <Image
            src="/mallLogoWhite.png"
            alt="Mall of Muscat Logo"
            width={160}
            height={90}
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          />
        </Box>
      </Box>

      {/* Store Info Dialog */}
      <Dialog
        open={!!selectedStore}
        onClose={() => setSelectedStore(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 1,
            p: 2,
            backgroundColor: "#ffffff",
            boxShadow: 10,
          },
        }}
      >
        {selectedStore && (
          <>
            {/* Floor Chip */}
            <Chip
              label={`Floor ${selectedStore.floor}`}
              color="primary"
              size="large"
              sx={{
                position: "absolute",
                top: "5%",
                left: "5%",
                color: "black",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "1.25rem 1.75rem",
              }}
            />

            <DialogTitle
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {selectedStore.name}
            </DialogTitle>

            <DialogContent>
              {selectedStore.logo && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box
                    sx={{
                      height: "auto",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={selectedStore.logo}
                      alt={selectedStore.name}
                      width={150}
                      height={150}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                </Box>
              )}

              <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
                mb={1}
              >
                {selectedStore.description || "No description provided."}
              </Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handlePlayVideo}
                sx={{
                  backgroundColor: "primary.main",
                  color: "black",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 8,
                  width: "80%",
                  "&:hover": {
                    backgroundColor: "#bca56e",
                  },
                }}
                startIcon={
                  <Image
                    src="/takeMe.png"
                    alt="Person Icon"
                    width={18}
                    height={24}
                  />
                }
              >
                Take Me There
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Fullscreen Zoomable Video */}
      {videoOpen && videoSrc !== null && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 10,
            width: "100vw",
            height: "100vh",
            bgcolor: "black",
          }}
        >
          <TransformWrapper>
            <TransformComponent>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  minWidth: "100vw",
                  minHeight: "100vh",
                  bgcolor: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <video
                  key={videoSrc}
                  src={videoSrc}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  controls={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    pointerEvents: "none",
                    appearance: "none",
                    background: "black",
                  }}
                  onEnded={handleCloseVideo}
                />
              </Box>
            </TransformComponent>
          </TransformWrapper>
        </Box>
      )}

      {/* Preload All Videos (hidden) */}
      {categories
        .flatMap((c) => c.stores)
        .map(
          (store) =>
            store.video &&
            store.video.trim() !== "" && (
              <video
                key={store.id}
                src={store.video}
                preload="auto"
                muted
                playsInline
                style={{ display: "none" }}
              />
            )
        )}
    </>
  );
}
