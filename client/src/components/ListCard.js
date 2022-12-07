import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Typography, Button, Grid, Collapse } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Stack } from '@mui/system';
import SongWorkspace from './SongWorkspace';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [open, setopen] = useState(false);
    const { idNamePair, selected,  changed, search} = props;

    function handleLoadList(event, id) {
        if(store.setCurrentList){
            console.log("continuing");
        }
        else{
            event.stopPropagation();
            console.log("handleLoadList for " + id);
            if (!event.target.disabled) {
                let _id = event.target.id;
                if (_id.indexOf('list-card-text-') >= 0)
                    _id = ("" + _id).substring("list-card-text-".length);

                console.log("load " + event.target.id);

                // CHANGE THE CURRENT LIST
                store.setCurrentList(id);
            }
        }
        
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        event.stopPropagation();
        setText(event.target.value);
    }

    const handleOpenList = (id) => (event) =>{
        event.stopPropagation();
        if(store.openList.value!==id){
            setopen(true);
            store.openListEdit(id);
        }
        else{
            setopen(false);
        }
    }

    const handleCloseList = (event) =>{
        event.stopPropagation();
        setopen(false);
        store.closeListEdit(idNamePair._id);
    }

    const handleClick = (event) => {
        event.stopPropagation();
        store.updateYouTubePlaylist(idNamePair._id);
    }
    let collapse = '';
    if(open)
    collapse = 
        <Box>
            <Collapse in={store.openList.value === idNamePair._id} timeout="auto" unmountOnExit width="90%">
                <SongWorkspace changed={changed} idNamePair={idNamePair}/>
            </Collapse>
        </Box>

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let inner="";
    console.log(idNamePair.publishedDate);
    if(idNamePair.published===true){
    inner =
            <Stack sx={{ p: 1, width: "100%"}}>
                <Box sx={{p:1, display:'inline-flex'}}>
                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}
                        <Typography>By:{idNamePair.ownerEmail} </Typography>
                        <Typography>Published: {idNamePair.publishedDate}</Typography></Box>
                    <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='like'>
                        <ThumbUpOffAltIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                    <Typography sx={{p:1, display:'inline-flex'}} >{idNamePair.likes}</Typography>
                    <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='dislike'>
                        <ThumbDownOffAltIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                    <Typography sx={{p:1, display:'inline-flex'}}>{idNamePair.dislikes}</Typography>
                </Box>
                <Box sx={{ p: 1 , display: "inline-flex", alignItems: "right"}}>
                    <Typography>Listens: {idNamePair.listens}</Typography>
                </Box>
            </Stack>
    }else{
        inner = 
            <Box sx={{ p: 1, flexGrow: 1, width: "100%" }}>{idNamePair.name}
            <Typography>By:{} </Typography></Box>
    }

    let cardElement = 
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "5px", bgcolor: '#8000F00F', marginTop: '2px', display: 'flex', flexDirection: "column",  p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '24pt'}}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >
            {inner}
            <Stack width="100%" bgcolor="transparent">
            <Grid item >
                        {collapse}
            </Grid>
            </Stack>
            <Grid container direction='row' justifyContent='flex-end' alignItems='flex-end'>
                <IconButton onClick={open ? handleCloseList : handleOpenList(idNamePair._id)} aria-label='edit'>
                    {open ? <KeyboardDoubleArrowUpIcon/> : <KeyboardDoubleArrowDownIcon/>}
                </IconButton>
            </Grid>
        </ListItem>
        

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 24}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;