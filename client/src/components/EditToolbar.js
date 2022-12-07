import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import {Grid, Typography, List, ListItem, Card, Container, touchRippleClasses} from '@mui/material';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const {changed, idNamePair} = props;

    function handleAddNewSong(event) {
        console.log("add")
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    function handleDeleteList(event) {
        event.stopPropagation();
        store.markListForDeletion(idNamePair._id);
    }
    async function handlePublish(event){
        event.stopPropagation();
        store.publishList();
        await store.loadIdNamePairs1();
        window.location.reload();
    }
    console.log(idNamePair.published);
    return (
        <Box sx={{marginTop: "10%", display: "flex", flexDirection: "column", width: "100%" }}>
            <Box sx={{width:"100%"}}>
            <Card
                color="primary" 
                //need to fix this
                hidden={store.openList.playlist.published}
                aria-label="add"
                id="add-song-button"
                onClick={handleAddNewSong}
            >
                <AddIcon />
            </Card>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", width: "100%", marginTop: "5%" }}>
            <Button 
                sx={{marginLeft:"2%", marginRight:"5%"}}
                disabled={!store.canUndo() || idNamePair.published}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                 Undo
            </Button>
            <Button 
                sx={{marginLeft:"2%", marginRight:"5%"}}
                disabled={!store.canRedo() || idNamePair.published}
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                Redo
            </Button>
            <Button
                sx={{marginLeft:"2%", marginRight:"5%"}}
                disabled={idNamePair.published===true}
                id='add-song-button'
                onClick={handlePublish}
                variant="contained">
                Publish
            </Button>
            <Button 
                sx={{marginLeft:"2%", marginRight:"5%"}}
                disabled={!store.canClose()}
                id='delete-list-button'
                onClick={handleDeleteList}
                variant="contained">
                Delete
            </Button>
            <Button 
                disabled={!store.canClose()}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                Duplicate
            </Button>
            </Box>
        </Box>
    )
}

export default EditToolbar;