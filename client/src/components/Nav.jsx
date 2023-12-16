import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { TbVinyl } from "react-icons/tb";
import { logout } from "../reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
      <AppBar position="static" >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: 'center' }}>
          <Box component={Link} to="/" sx={{ m: 1, display: 'flex', gap: 2, alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <TbVinyl size={40} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontWeight: 500,
                display: { xs: 'none', md: 'block' }
              }}
            >
              AOTY Playlist Gen
            </Typography>
          </Box>
          <Box sx={{ fontSize: 1 }}>
            <Button  sx={{ fontSize: 14 }} component={Link} to="/about" color="inherit">About</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Nav;