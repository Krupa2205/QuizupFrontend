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
          </Box>

          {/* Navbar Buttons (Visible on Large Screens) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {[
              { name: "Home", action: () => handleNavigation("/") },
              { name: "SolveQuiz", action: () => handleNavigation("/quiz") },
              { name: "Review", action: () => handleNavigation("/review") },
            ].map((item) => (
              <Button
                key={item.name}
                onClick={item.action}
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "'Rubik', sans-serif", 
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                  borderRadius: "20px", 
                  padding: "10px 20px",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "lightpink",
                    boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
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

      {/* Dropdown Menu for Small Screens */}
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
            {[
              { name: "Home", action: () => handleNavigation("/") },
              { name: "SolveQuiz", action: () => handleNavigation("/quiz") },
              { name: "Review", action: () => handleNavigation("/review") },
              
            ].map((item) => (
              <ListItem
                button
                key={item.name}
                sx={{
                  padding: 2,
                  fontWeight: "bold",
                  fontFamily: "'Oswald', sans-serif", 
                  color: "white",
                  cursor: "pointer",
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={item.action}
              >
                {item.name}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}