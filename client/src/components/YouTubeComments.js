import GlobalStoreContext from "../store";
import AuthContext from "../auth";
import {useState, useContext, useEffect} from 'react'

import Comments from './Comments'
import YouTubePlayer from "./YouTubePlayer"

import {Box, Tabs, Tab} from '@mui/material'

function SwitchTab (props){
    const {children, value, index, ...other} = props;

    return(
        <div>
                <Box sx={{marginTop: "15%"}}>
                    {children}
                </Box>
        </div>
    );
}


function YouTubeComments(props){
    const {store} = useContext(GlobalStoreContext);
    const [value,setValue] = useState(0);

    const handleChange = (event, newValue) => {
        event.stopPropagation();
        setValue(newValue);
      };

    return(
        <Box sx={{padding: 1, display: "flex", alignItems: "center", width: '100%'}}>
            <Tabs id="play-com" aria-label="basic tabs example" onChange={handleChange} value={value}>
                <Tab label="Player" />
                <Tab label="Comments" />
            </Tabs>
            <Box height='80%'>
              <Box>
                <SwitchTab value={0} index={0} >
                  <YouTubePlayer/>
                </SwitchTab>
              </Box>
              <Box height='100%'>
                <SwitchTab value={1} index={1}>
                  <Comments/>
                </SwitchTab>
              </Box>
            </Box>
            </Box>
    )
}

export default YouTubeComments;