import React from 'react';
import YouTube from 'react-youtube';
import GlobalStoreContext from "../store";
import AuthContext from '../auth';
import { useContext } from "react";
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";

export default function YouTubePlayer(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    // const {cursong} = props;
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = store.youTubePlaylist;
    if(!playlist || !store.youTubeCurrentSong){
        return "";
    }

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = store.youTubeCurrentSong;

    const playerOptions = {
        height: '380',
        width: '630',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters,
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = '';
        console.log("song youtube" + store.youTubeCurrentSong);
        console.log(store.youTubeCurrentSong);
        console.log(store.youTubePlaylist);
        if(store.youTubeCurrentSong){
            song = store.youTubePlaylist.songs.indexOf(store.youTubeCurrentSong).youTubeId;
        }
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        store.addYouTubePlayer(event.target);
    }

    // function nextSong(){
    //     let index = store.currentYouTubePlaylist.songs.indexOf(store.youTubeCurrentSong)+1;
    //     if(index+1 === store.currentYouTubePlaylist.songs.length){
    //         index = store.currentYouTubePlaylist.songs[0];
    //     }
    //     store.setCurrentYouTubeSong(index);
    // }

    function prevSong(){
        let index = 0;
        if(0 !== store.currentYouTubePlaylist.songs.indexOf(store.youTubeCurrentSong)){
            index = store.currentYouTubePlaylist.songs.indexOf(store.youTubeCurrentSong)-1;
        }
        else{
            index = store.currentYouTubePlaylist.songs.length-1;
        }
        store.setCurrentYouTubeSong(index);
    }

    function playSong(){
        store.youTubePlayer.playVideo();
    }

    function stopSong(){
        store.youTubePlayer.pauseVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    return (
    <div>
    <YouTube
        videoId={store.youTubeCurrentSong.youTubeId}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} 
    /> 
          <Box
          sx={{
            width: "90%",
            backgroundColor: "lightgray",
            borderRadius: "20px",
          }}>
          <Grid container marginTop="5px" rowGap="5px">
            <Grid item xs={12} sx={{ fontSize: 30, paddingLeft: "30%" }}>
              <strong>Now Playing</strong>
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={3}>
              Playlist:
            </Grid>
            <Grid item xs={5}>
              {store.youTubePlaylist.name}
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={3}>
              Title:
            </Grid>
            <Grid item xs={5}>
              {store.youTubeCurrentSong.title}
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={3}>
              Artist:
            </Grid>
            <Grid item xs={5}>
              {store.youTubeCurrentSong.artist}
            </Grid>
          </Grid>
        </Box>
        <Grid container>
        <Grid item xs={2}/>
          <Grid item xs={2}>
            <Button onClick={prevSong} marginRight={"50%"}>
              <FastRewindIcon sx={{fontSize: 30,color: "#899499",}}/>
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={stopSong}>
              <StopIcon sx={{fontSize: 30,color: "#736e62",}}/>
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={playSong}>
              <PlayArrowIcon sx={{fontSize: 30,color: "#736e62",}}/>
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={incSong}>
              <FastForwardIcon sx={{fontSize: 30,color: "#736e62",}}/>
            </Button>
          </Grid>
          </Grid>
      </div>);
}