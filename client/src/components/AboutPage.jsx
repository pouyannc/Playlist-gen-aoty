import { Box, Typography } from "@mui/material"
import { FaGitAlt, FaGithub, FaNode, FaReact } from "react-icons/fa";
import { SiMui, SiVite } from "react-icons/si";



const AboutPage = () => {
  return (
    <Box sx={{ textAlign: 'left', m: 6, mx: 15, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '70vh' }}>
      <Box>
        <Typography sx={{ textAlign: 'center', mb: 2 }} variant="h3">About</Typography>
        <Typography sx={{ minWidth: 100, m: 4 }} variant="subtitle1">
          Now more than ever, music is so abundant and easily accessible. With it, there are expansive communities built around sharing and discussing the most outstanding new waves in the industry. 
          Using data from community reviews over at AOTY <a target="_blank" rel="noopener noreferrer" style={{ color: 'pink' }} href="https://www.albumoftheyear.org/">(albumoftheyear.org)</a>, this app generates a playlist of the hottest albums that match your preferred criteria.
          The generated playlist is automatically added to your Spotify. Easily discover new tracks and artists you love using INSERT SITE NAME and the effort of music lovers at AOTY.
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
          <Typography sx={{ textAlign: 'left', my: 2 }} variant="h6">Created by Pouyan Chamanian</Typography>
          <Box sx={{ width: 20 }}>
            <a target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }} href="https://github.com/pouyannc"><FaGithub size={40} /></a>
          </Box>
        </Box>
        <Box sx={{ mt: 9, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
          <FaGitAlt size={50} />
          <FaReact size={50} />
          <FaNode size={50} />
          <SiVite size={50} />
          <SiMui size={50} />
        </Box>
      </Box>
    </Box>
  )
}

export default AboutPage