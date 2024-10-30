import Person2Icon from "@mui/icons-material/Person2";
import {
  AppBar,
  Avatar,
  Grid,
  ListItemButton,
  Menu,
  MenuItem,
  MenuList,
  Slide,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MuiTheme,
  useAuth,
  useLocalStorage,
  useMuiTheme,
  useRoute,
} from "../GlobalProviders";

const Header = () => {
  const { toggleLightDarkTheme, theme } = useMuiTheme();

  const { pageTitle } = useRoute();

  const handleThemeSwitchClick = () => {
    toggleLightDarkTheme();
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const { logout, user } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const handleLogoutLinkCLick = () => {
    handleMenuClose();
    logout();
    navigate("/");
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuToggle = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/authenticated/profile");
  };
  return (
    <AppBar>
      <Toolbar>
        <Box flexWrap="nowrap" flexGrow="1">
          {/* For decorative icons, set aira-hidden to true */}

          <Slide direction="right" in={true} timeout={500}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography>{pageTitle}</Typography>
            </Box>
          </Slide>
        </Box>

        <Box>
          <Tooltip title={`Toggle light/dark mode - Currently ${theme} mode.`}>
            <Switch
              checked={theme === MuiTheme.Dark}
              onChange={handleThemeSwitchClick}
              inputProps={{
                "aria-label": `Toggle light/dark mode - Currently ${theme} mode.`,
              }}
            />
          </Tooltip>
        </Box>
        <Box flexGrow={0}>
          <Typography variant="h6" noWrap>
            {user && user.userName} {/* Displaying the user's name */}
          </Typography>
        </Box>
        <Grid>
          <Box display="flex">
            <Tooltip title>
              <ListItemButton
                id="demo-positioned-button"
                aria-controls={isMenuOpen ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
                onClick={handleMenuToggle}
              >
                {user ? (
                  <Avatar alt={user.userName} src={user.imageUrl} />
                ) : (
                  <Person2Icon fontSize="large" />
                )}
              </ListItemButton>
            </Tooltip>

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuList autoFocusItem={isMenuOpen}>
                <MenuItem
                  aria-label={"menu profile link"}
                  onClick={handleProfileClick}
                  id="profile-button"
                >
                  <Typography noWrap>profile</Typography>
                </MenuItem>
                <MenuItem
                  aria-label={"menu logout link"}
                  onClick={handleLogoutLinkCLick}
                  id="logout-button"
                >
                  <Typography noWrap>logout</Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
