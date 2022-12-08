
import { useContext, useState, useEffect } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import {Box, Typography, IconButton, Card, Grid, List, TextField} from '@mui/material';

function Comments(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const {user} = props;
    let comment = '';
    let arr = [];
    for (var o in store.youTubePlaylist.comments){
        comment = store.youTubePlaylist.comments[o];
        arr.push(
            <Card height='40px' sx={{bgcolor:'white'}}>
                <Typography>{user}</Typography>
                <br></br>
                <Typography> {comment}</Typography>
            </Card>
        );
    }
    return (
        
        <Box >
            {arr}
        </Box>
    )
}

export default Comments;