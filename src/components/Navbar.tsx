import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from 'assets/images/MlLogo.png';
import ScrollToColor from './ScrollToColor';
import { Link } from 'react-router-dom';
import i18next from "i18next";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from "react-i18next";

const pages: string[] = ['Algorithms', 'Contact Us'];
const pages_links: { [id: string]: string; } = { 'Algorithms': "/algorithms", 'Contact Us': "/contact" };
const page_button_writing: { [id: string]: string; } = { 'Algorithms': "algorithms.algos", 'Contact Us': "algorithms.contact" };
const settings = [['he', 'עברית'], ['en', 'English']];

const changeLang = (lan: string) => {
  // console.log(lan)
  i18next.changeLanguage(lan);
}

// type ScrollToColorProps = {
//   nonTransparentBackgroundColor: string,
//   transparentBackgroundColor: string,
//   nonTransparentColor: string,
//   transparentColor: string,
//   nonTransparentTransition: string,
//   transparentTransition: string,
//   nonTransparentBoxShadow: string,
//   transparentBoxShadow: string,
//   padding: string,
//   children: any,
// }

// type appBarParametersProps = any

export default function Navbar(props: { scrollToColorParameters: any, appBarParameters: any }) {
  const [t] = useTranslation('translation');
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ScrollToColor {...props.scrollToColorParameters}>
      <AppBar {...props.appBarParameters}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, ml: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Link to={"/"}>
                <img src={logo} alt="Logo" width="40" height="40" />
              </Link>
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
                  <Link to={pages_links[page]} style={{ textDecoration: 'none', color: "black" }}>
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{t(page_button_writing[page])}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <Link to={"/"}>
                <img src={logo} alt="Logo" width="40" height="40" />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* <Stack spacing={2} direction="row"> */}
              {pages.map((page) => (
                (page === "Contact Us") ?
                  (
                    <Box margin={1}>
                      <Link to={pages_links[page]} style={{ textDecoration: 'none', color: "black" }}>
                        <Button
                          key={page}
                          onClick={handleCloseNavMenu}
                          sx={{ display: 'block', textTransform: "none" }}
                          variant="outlined"
                        >
                          {t(page_button_writing[page])}
                        </Button>
                      </Link>
                    </Box>
                  ) : (
                    <Box margin={1}>
                      <Link to={pages_links[page]} style={{ textDecoration: 'none', color: "black" }}>
                        <Button
                          key={page}
                          onClick={handleCloseNavMenu}
                          sx={{ display: 'block', textTransform: "none", backgroundColor: "#209070" }}
                          variant="contained"
                        >
                          {t(page_button_writing[page])}
                        </Button>
                      </Link>
                    </Box>
                  )
              ))}
              {/* </Stack> */}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Select Language">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <LanguageIcon fontSize="large" />
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
                  <MenuItem key={setting[0]} onClick={() => { changeLang(setting[0]); handleCloseUserMenu() }}>
                    <Typography textAlign="center">{setting[1]}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </ScrollToColor>
  );
};

Navbar.defaultProps = {
  scrollToColorParameters: {
    // nonTransparentBackgroundColor:"#3c4e76",
    // transparentBackgroundColor:"#3c4e76",
    // nonTransparentColor:"white",
    // transparentColor:"white",
    // nonTransparentTransition:"0.3s",
    // transparentTransition:"0.5s",
    // boxShadow:"none",
    // padding:"10px 0px",
  },
  appBarParameters: {
    position: "static",
    // style:{
    //   background: "#3c4e76",
    //   boxShadow: 'none',
    // } 
  }
}
