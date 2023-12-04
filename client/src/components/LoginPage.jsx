import { Box, Button, Container, Typography } from '@mui/material'
import { BiSolidSpeaker } from "react-icons/bi";
import { TbVinyl } from "react-icons/tb";

const LoginPage = () => {
  const serverUrl = 'http://localhost:3003/api'

  return (
    <div>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'center', my: '12%' }}>
        <Typography variant='h2'>AOTY Playlist Gen</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <BiSolidSpeaker size={80}/>
          <TbVinyl size={70} />
          <BiSolidSpeaker size={80}/>
        </Box>
        <Typography variant='h6'>Discover music by generating playlists compiled from the hottest albums as per the <a style={{ textDecoration: 'none', color: 'inherit' }} href='https://www.albumoftheyear.org/'>aoty.org</a> community.</Typography>
        <Typography variant='h6'>The current version of this app requires login using a Spotify account.</Typography>
        <Button href={`${serverUrl}/login`} variant='contained' sx={{ bgcolor: 'green', fontWeight: 700, width: '40%', alignSelf: 'center' }}>Login with Spotify</Button>
      </Container>
    </div>
  )
}

export default LoginPage