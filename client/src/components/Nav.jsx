import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";

const Nav = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
      <AppBar position="static" >
        <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography 
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Playlist Gen
            </Typography>
            <Box>
              <Button color="inherit">Profile</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Nav;