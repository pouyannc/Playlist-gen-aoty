import { Button, Container } from '@mui/material'
import React from 'react'

const LoginPage = () => {
  const serverUrl = 'http://localhost:3003/api'

  return (
    <div>
      <Container sx={{ textAlign: 'center', mt: '40%'}}>
        <Button><a style={{ textDecoration: 'none', color: 'green' }} href={`${serverUrl}/login`}>Login with Spotify</a></Button>

      </Container>
      
    </div>
  )
}

export default LoginPage