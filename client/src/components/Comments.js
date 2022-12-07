
import { useContext, useState, useEffect } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import {Box, Typography, IconButton, Card, Grid, List, TextField} from '@mui/material';

function Comments() {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    return (
        <Box>
            <Card height='100px' sx={{bgcolor:'white'}}>
                
            </Card>
        </Box>
    )
}

export default Comments;