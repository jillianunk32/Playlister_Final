import backgroundlogo from '../images/playlisterlogo.png'
import {Stack, Button, Typography} from '@mui/material/';

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <img src={backgroundlogo} width={300} height={120} alt=""/> Created by Jillian Unkenholz<br></br>
            <Typography id="welcome-playlister"> Welcome to Playlister!</Typography><br></br>
            <img src={backgroundlogo} width={120} height={70} alt="" /> is an app that allows users to create their own playlists
            from YouTube. It also includes browsing other's playlists, and publicly publishing your own playlists for others to 
            use. Enjoy creating, showing off your playlists and listening!<br></br>
            <br></br>
            <br></br>
            <Stack direction="column" alignItems="center">
                <Button id="splash-button" variant="contained" href='/login/' sx={{width: 200, margin: 1}}>Login</Button>
                <Button id="splash-button" variant="contained" href='/register/' sx={{width: 200, margin: 1}}>Create Account</Button>
                <Button id="splash-button" variant="contained" href='/login/' sx={{width: 200, margin: 1}}>Continue as Guest</Button>
            </Stack>
        </div>
    )
}