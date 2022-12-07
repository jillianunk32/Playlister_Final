import {Box, Grid, Typography, List, ListItem, Card, Container} from '@mui/material';
import GlobalStoreContext from '../store';
import {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import SongCard from './SongCard'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'

import EditToolbar from './EditToolbar';

function SongWorkspace(props){
    const {changed, idNamePair, search} = props;
    const {store} = useContext(GlobalStoreContext);
    store.history = useHistory();

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        console.log("edit modal open");
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    const changeYouTube = (id) => {
        console.log("id"+id);
        store.setCurrentYouTubeSong(id);
    }


    let songs = '';
    console.log("openlist"+store.openList);
    if(store.openList && store.openList.playlist.songs.length!==0){
        songs =
        <List 
            sx={{overflow: 'scroll', height: '90%', width: '90%', bgcolor: "transparent"}}
        >
            {
                store.openList.playlist.songs.map((song, index) => (
                    <SongCard
                        index={index}
                        song={song}
                        key={song.youTubeId}
                        setsong={changeYouTube}
                    />
                ))  
            }
         </List> 
    }
    else if(store.openList && store.openList.playlist.songs.length===0){
        songs = '';
    }
    return(
        <Box>
            <Container sx={{maxHeight:'500px', bgcolor: "transparent"}}>
                <Box width='100%' height='100%'>
                    <Box sx={{height:'100%'}}>
                        {songs}
                    </Box>
                </Box>
            </Container>     
            <EditToolbar changed={changed} idNamePair={idNamePair}/>
            { modalJSX }
        </Box>
    )
}

export default SongWorkspace;