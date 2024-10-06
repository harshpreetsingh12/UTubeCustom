import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {Typography, Box, Stack} from '@mui/material';
import { CheckCircle, SettingsInputSvideoSharp } from '@mui/icons-material';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
// import CircularProgress from '@mui/material/CircularProgress';

import {Videos,Loade, CommentCard, Loader} from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { commentss, search, vDetails } from './ex';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail]=useState([]);
  const [comments, setComments]=useState([]);
  const [videos, setVideos]=useState([]);
  const [ShowCom, setShowCom]=useState(false);
  const {id} = useParams();
  // console.log(videoDetail)
  
  //http://localhost:3000/video/dh61UOvDj-k
  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) =>setVideoDetail(data.items[0]))
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data)=> setVideos(data.items))
    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`)
    .then((data)=>setComments(data.items))
  }, [id])
  if (!videoDetail?.snippet) return <Loader/>;
  const {snippet:{title,channelId, channelTitle}, statistics:{viewCount, likeCount}} = videoDetail;
  return (
    <Box minHeight='95vh'>
      <Stack direction={{xs:'column', md:'row'}}>
        <Box  maxHeight='100vh' flex={1}>
          <Box maxHeight={'95vh'} overflow={'scroll'} sx={{width:'100%', postion:'sticky', top:'86px'}}>

            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player" controls/>
            <Typography color="#fff" variant="h5" fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{color:'#fff'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm:'subtitle1', md:'h6'}} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{fontSize:'12px', color:'5px',pl:'5px'}}/>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{opacity:0.7}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{opacity:0.7}}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
            <Typography variant={{sm:'', md:'h6'}} color="#fff" padding="15px" onClick={_=>setShowCom(!ShowCom)}>
                  Show Comments
                  <ModeCommentIcon  sx={{fontSize:'12px', color:'5px',pl:'5px',pt:'15px'}}/>
                </Typography>
                {
                  ShowCom &&
                  <Stack direction="column" gap='20px' justifyContent="space-between" sx={{color:'#fff'}} py={1} px={2}>
                  {comments.map((comment,idx) => (
                          <CommentCard comment={comment?.snippet} key={idx}/>
                    ))}
                  </Stack>
                }
          </Box>
        </Box>
      <Box overflow='scroll' maxHeight='100vh' px={2} py={{md:1, xs:5 }} justifyContent="center" alignItems="center">
        <Videos videos={videos} direction="column"/>
      </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail
