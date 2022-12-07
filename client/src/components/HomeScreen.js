import React, { useContext, useEffect, useRef } from 'react'
import { GlobalStoreContext } from '../store'
import { useState } from 'react'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import YouTubeComments from './YouTubeComments'
import { useHistory } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
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
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    store.history = useHistory();
    const search = useRef(false);

    useEffect(() => {
        if(store.homeScreenView===1 && search.current){
            store.loadIdNamePairs();
            toggleSearch();
            console.log("1")
        }else if (store.homeScreenView===1 && !store.current){
          store.loadIdNamePairs();
          console.log("2")
        }
        else if(store.homeScreenView!==1 && search.current){
          store.loadIdNamePairs();
          console.log("3")
        }
        else if(store.homeScreenView!==1 && !search.current){
          toggleSearch();
          console.log("4")
        }
        toggleSearch();
          console.log(search.current);
    }, [changed.current, search.current]);

    const handleOpen = (id) => {
        store.openListEdit(id);
    }

    const toggleChanged = () => {
        changed.current = !(changed.current);
    }

    const toggleSearch = () => {
        search.current = !(search.current);
    }
    function handleCreateNewList() {
        store.createNewList();
    }
    function handleHomeClick(event){
        event.stopPropagation();
        store.changeHomeScreenView(1);
        store.loadIdNamePairs();
    }
    function handleGroupsIcon(event){
        event.stopPropagation();
        store.changeHomeScreenView(2);
    }
    function handlePersonIcon(event){
        event.stopPropagation();
        store.changeHomeScreenView(3);
    }
    function handleSearch(event){
        let searchString = '';
        event.stopPropagation();
        if(event.key==="Enter"){
            searchString= event.target.value;
            console.log(searchString);
            store.searchBy(searchString);
            if(store.homeScreenView===1){
                store.changeHomeScreenView(2);
            }
            toggleChanged();
            toggleSearch();
        }
    }
    let handleSortButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    let listCard = "";
    console.log(search)
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


    let menu = 
    (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
        //   onClose={handleMenuClose}
        >
          <MenuItem
            // onClick={() => {
            //   store.setSortOption("Name");
            //   handleMenuClose();
            // }}
          >
            Name (A-Z)
          </MenuItem>
          <MenuItem
            // onClick={() => {
            //   store.setSortOption("Date");
            //   handleMenuClose();
            // }}
          >
            Publish Date (Newest)
          </MenuItem>
          <MenuItem
            // onClick={() => {
            //   store.setSortOption("Listens");
            //   handleMenuClose();
            // }}
          >
            Listens (High - Low)
          </MenuItem>
          <MenuItem
            // onClick={() => {
            //   store.setSortOption("Likes");
            //   handleMenuClose();
            // }}
          >
            Likes (High - Low)
          </MenuItem>
          <MenuItem
            // onClick={() => {
            //   store.setSortOption("Dislikes");
            //   handleMenuClose();
            // }}
          >
            Dislikes (High - Low)
          </MenuItem>
        </Menu>
      );
    return (
        <div id="playlister-list-selector">
            <div id="list-selector-heading" >
                {/* <Typography variant="h1" style={{fontSize: 30}}>Your Playlists</Typography> */}
                <Box sx={{padding: 1, display: "flex", alignItems: "center", width: '100%'}}>
                    <IconButton onClick={handleHomeClick}><HomeIcon sx={{fontSize: 30}}/></IconButton>
                    <IconButton onClick={handleGroupsIcon}><GroupsIcon sx={{fontSize: 30}}/></IconButton>
                    <IconButton onClick={handlePersonIcon}><PersonIcon sx={{fontSize: 30}}/></IconButton>
                    <TextField id="outlined-basic" label="Search" variant="outlined" sx={{marginLeft:"10%", width: "50%"}} onKeyDown={handleSearch}/>
                    <Box sx={{marginLeft: "25%", display: "inline-flex"}}>Sort By<IconButton onClick={handleSortButtonClick} ><SortIcon sx={{fontSize: 42}} /></IconButton>
                    {menu}</Box>
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