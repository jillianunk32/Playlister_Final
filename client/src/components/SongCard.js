import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { useHistory } from "react-router-dom"

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index, setsong } = props;
    const history = useHistory();

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        event.stopPropagation();
        store.showRemoveSongModal(index, song);
    }
    
    function handleClick(event) {
        console.log(event.detail);
        // event.stopPropagation();
        // if (event.detail === 2) {
        //     event.stopPropagation();
        //     console.log("double clicked");
        //     store.showEditSongModal(index, song);
        // }
        if (event.detail ===1) {
            event.stopPropagation();
            console.log("single-clicked");
            setsong(index);
            // store.setCurrentYouTubeSong(index);
        }
    }

    function handleDbClick(event){
        // DOUBLE CLICK IS FOR SONG EDITING
        event.stopPropagation();
        store.showEditSongModal(index, song);
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            // onDoubleClick={handleDbClick}
            onClick={handleClick}
        >
           <Box>
            <p id={'song-' + index + '-link'} className="song-link">
            {index + 1} . {song.title} by {song.artist}
            </p>
            <Button
                sx={{transform:"translate(-10%, -120%)", width:"5px", height:"30px"}}
                disabled={store.openList.playlist.published}
                variant="contained"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleRemoveSong}>{"\u2715"}</Button>
            {/* </Box>  */}
            <Button
                sx={{transform:"translate(-10%, -120%)", width:"5px", height:"30px"}}
                disabled={store.openList.playlist.published}
                variant="contained"
                id={"edit-song-" + index}
                className="list-card-button"
                onClick={handleDbClick}>{"Edit"}</Button>
            </Box> 
        </div>
    );
}

export default SongCard;