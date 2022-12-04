import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import {Box, Typography, IconButton, TextField} from '@mui/material/';
import YouTubePlayer from './YouTubePlayer';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                
            }
            <Fab sx={{transform:"translate(500%, 10%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
            </List>;
    }
    return (
        <div id="playlister-list-selector">
            <div id="list-selector-heading" >
                {/* <Typography variant="h1" style={{fontSize: 30}}>Your Playlists</Typography> */}
                <Box sx={{padding: 1, display: "flex", alignItems: "center", width: '100%'}}>
                    <IconButton><HomeIcon sx={{fontSize: 30}}/></IconButton>
                    <IconButton><GroupsIcon sx={{fontSize: 30}}/></IconButton>
                    <IconButton><PersonIcon sx={{fontSize: 30}}/></IconButton>
                    <TextField id="outlined-basic" label="Search" variant="outlined" sx={{marginLeft:"10%", width: "50%"}}/>
                    <Typography sx={{marginLeft: "25%"}}>Sort By</Typography>
                    <IconButton><SortIcon sx={{fontSize: 42}}/></IconButton>
                </Box>    
            </div>
            <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </Box>
            <div id="youtube-player">
                    <YouTubePlayer/>
            </div>
        </div>)
}

export default HomeScreen;