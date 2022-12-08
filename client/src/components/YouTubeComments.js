import GlobalStoreContext from "../store";
import AuthContext from "../auth";
import {useState, useContext, useEffect} from 'react'

import Comments from './Comments'
import YouTubePlayer from "./YouTubePlayer"

import {Box, Tabs, Tab} from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


function YouTubeComments(props){
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [value,setValue] = useState('1');

const handleChange = (event, newValue) => {
    event.stopPropagation();
    setValue(newValue);
  };

    return(

<Box sx={{marginTop: "10%"}}>
<Box sx={{ padding: 1, display: "flex", alignItems: "center", width: '100%'}}>
<TabContext value={value}>
  <TabList onChange={handleChange} aria-label="tabs">
    <Tab label="Player" value="1" />
    <Tab label="Comments" value="2" />
  </TabList>

<TabPanel value="1" sx={{margintop: "10%", marginLeft: "30%"}}><YouTubePlayer/></TabPanel>
<TabPanel value="2"><Comments user={auth.user.userName}/></TabPanel>
</TabContext>
</Box>
</Box>

    )
}

export default YouTubeComments;