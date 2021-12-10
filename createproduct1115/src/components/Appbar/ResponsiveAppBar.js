import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

// ⇒@mui/icons-materialインストールした
  import MenuIcon from '@mui/icons-material/Menu';
  import Container from '@mui/material/Container';
  import Avatar from '@mui/material/Avatar';
  import Button from '@mui/material/Button';
  import Tooltip from '@mui/material/Tooltip';
  import MenuItem from '@mui/material/MenuItem';

// signoutのためにimport
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { useNavigate } from "react-router-dom";
  import { db, auth } from "../../firebase";

const pages = ['内容１', '内容２', '内容３'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // navigateを宣言
    let navigate = useNavigate();


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {

    console.log("navmenuを押してevent>",event.target.textContent);

    if (event.target.textContent == settings[3]){

      try {
        signOut(auth);
        navigate("/Landing");
      } catch (error) {
        alert(error.message);
      }

    }

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static"
      // appbarの色を指定する
      sx={{backgroundColor:"#00c899"}}
    >

      <Container maxWidth="xl"
      >

        <Toolbar disableGutters
        >

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO予定
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}

            </Menu>

          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO予定
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (

              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>

            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Open settings">

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                setting
              </IconButton>

            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu} value={setting}>
                  <Typography textAlign="center" value={setting}>{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>

          </Box>

        </Toolbar>

      </Container>

    </AppBar>
  );
};
export default ResponsiveAppBar;