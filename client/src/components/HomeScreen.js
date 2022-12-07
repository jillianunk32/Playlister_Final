import React, { useContext, useEffect, useRef } from 'react'
import { GlobalStoreContext } from '../store'
import { useState } from 'react'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import YouTubeComments from './YouTubeComments'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';


import {Box, Typography, IconButton, TextField, Grid} from '@mui/material/';
import YouTubePlayer from './YouTubePlayer';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const changed = useRef(false);

    useEffect(() => {
        store.loadIdNamePairs();
    }, [changed.current]);

    const handleAddList = () => {
        store.createNewList();
        toggleChanged();
    }

    const handleOpen = (id) => {
        store.openListEdit(id);
    }

    const toggleChanged = () => {
        changed.current = !(changed.current);
    }

    function handleCreateNewList() {
        console.log(store.newListConter);
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{overflow:'auto', width: '90%', left: '5%', height: '100%'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        changed={toggleChanged}
                        open={store.open}
                        setopen={handleOpen}
                        selected={pair._id === ((store.currentList) ? store.currentList._id : false)}
                    />
                ))
                
            }
            <Fab sx={{transform:"translate(600%, 10%)"}}
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
            <Grid container sx={{height: '100%'}}>
                <Grid item xs={7} sx={{overflow: 'auto', height: '100%'}}>
            <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </Box>
            </Grid>
            <Grid item xs={4}>
            <Box id = "youtube-comments">
                <YouTubeComments/>
            </Box>
            </Grid>
            </Grid>
            
        </div>)
}

export default HomeScreen;