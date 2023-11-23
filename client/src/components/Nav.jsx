import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Nav = () => {
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
              <Button color="inherit">Logout</Button>
            </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Nav;