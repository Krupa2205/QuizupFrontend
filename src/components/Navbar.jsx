import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo1.jpg";
import { keyframes } from "@emotion/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  `;

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(45deg, #BFBBA9, #F7CFD8, #E195AB,#FFCFCF,#F2EFE7)",
          backgroundSize: "200% 200%",
          animation: `${gradientAnimation} 5s infinite alternate`,
          top: 0,
          zIndex: 1301,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={Logo}
              alt="QuizUp Logo"
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
             <span style={{ fontWeight: 700, fontSize: "1.5rem", marginLeft: "10px" ,color: "#E53888" }}>QuizUp</span>
          </Box>

          {/* User Profile and Menu Icon (Visible on Small Screens) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: 50,
                      height: 50, 
                    },
                  },
                }}
              />
            ) : (
              <SignInButton>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#FFCCE1",
                    color: "#DA498D",
                    fontFamily: "'Rubik', sans-serif", 
                  }}
                >
                  Sign In
                </Button>
              </SignInButton>
            )}

            <IconButton
              color="black"
              onClick={() => setMenuOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, width: 50, height: 50 }}
            >
              <MenuIcon sx={{ fontSize: 30, fontWeight: "bold" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu for Small Screens - Now Empty */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            height: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.8)", 
            backdropFilter: "blur(5px)", 
            top: "50px", 
            boxShadow: "none", 
            transition: "transform 0.3s ease-in-out", 
          },
        }}
      >
        <Box
          onMouseLeave={() => setMenuOpen(false)} 
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 0",
          }}
        >
          <List>
            {/* Menu items removed */}
          </List>
        </Box>
      </Drawer>
    </>
  );
}