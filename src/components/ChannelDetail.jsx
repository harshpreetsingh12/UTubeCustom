import {useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Box } from '@mui/material'
import {Videos, ChannelCard} from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
const [videos,setVideos]=useState([])
const [channelDetail, setChannelDetail] = useState(null)
const {id} = useParams();
// console.log(id)
useEffect(()=>{
fetchFromAPI(`channels?part=snippet&id=${id}`)
.then((data) =>setChannelDetail(data?.items[0]))

fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
.then((data) =>setVideos(data?.items))
},[id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 0%, rgba(111,8,8,1) 25%, rgba(86,8,35,1) 42%, rgba(0,212,255,1) 100%)', zIndex:10, height:'280px'}}
        />
        <ChannelCard channelDetail={channelDetail}
        marginTop="-120px" />
      </Box>
      <Box display='flex' p="2">
        <Box sx={{mr: {sm:'150px'}}}/>
          <Videos videos={videos}/>



      </Box>
    </Box>
  )
}

export default ChannelDetail
