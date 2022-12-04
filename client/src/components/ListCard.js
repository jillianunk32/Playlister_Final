import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Stack } from '@mui/system';

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
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
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
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '2px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '24pt'}}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}
            <Typography>By:{} </Typography>
            <Typography>Published: {}</Typography></Box>
            
            <Stack sx={{ p: 1}}>
                <Box sx={{p:1, display:'inline-flex'}}>
                    <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='like'>
                        <ThumbUpOffAltIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                    <Typography >Num Likes</Typography>
                    <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='dislike'>
                        <ThumbDownOffAltIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                    <Typography>Num Disikes</Typography>
                </Box>
                <Box sx={{ p: 1 , display: "inline-flex", alignItems: "right"}}>
                    <Typography>Listens: </Typography>
                    <IconButton sx={{marginLeft: "60%"}}onClick={handleToggleEdit} aria-label='edit'>
                        <KeyboardDoubleArrowDownIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                </Box>
            </Stack>
        </ListItem>

        let unpublishedCardElement = 
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '2px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '24pt'}}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}
            <Typography>By:{} </Typography></Box>
            <Box sx={{ p: 1 , alignItems: "bottom-right"}}>
                <IconButton sx={{alignItems: "bottom-right"}}onClick={handleToggleEdit} aria-label='edit'>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'24pt'}} />
                </IconButton>
            </Box>
        </ListItem>

        let openCard = 
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '2px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '24pt'}}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}
            <Typography>By:{} </Typography></Box>
            <Box sx={{ p: 1, display: "flex", flexWrap: "no-wrap"}}>
                <Button onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='undo'>
                    Undo
                </Button>
                <Button onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='redo'>
                    Redo
                </Button>
                <Button onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='publish'>
                    Publish
                </Button>
                <Button onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    Delete
                </Button>
                <Button onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='duplicate'>
                    Duplicate
                </Button>
            </Box>
            <Box sx={{ p: 1 , alignItems: "right"}}>
                <IconButton sx={{alignItems: "right"}}onClick={handleToggleEdit} aria-label='edit'>
                    <KeyboardDoubleArrowUpIcon style={{fontSize:'24pt'}} />
                </IconButton>
            </Box>
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
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;