import {Stack, Box, CardMedia, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

const CommentCard = ({comment}) => {
 const {topLevelComment}=comment
 const timeCalc=(date)=>{
      // Import the moment.js library
    const moment = require('moment');

    // The given timestamp
    const timestamp = moment(date);

    // Current time
    const currentTime = moment();

    // Calculate the time difference
    const duration = moment.duration(currentTime.diff(timestamp));

    // Format the time difference
    let formattedTime;

    const days = duration.days();
    const months = duration.months();
    const years = duration.years();

    if (years > 0) {
      formattedTime = years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
      formattedTime = months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
      formattedTime = days === 1 ? "1 day ago" : `${days} days ago`;
    } else {
      formattedTime = "Less than a day ago";
    }
return formattedTime

 }
//  console.log(topLevelComment)
  return (
    <Stack direction={'row'}  justifyContent="start" gap={2}>
       <CardMedia 
        image={comment?.topLevelComment?.snippet?.authorProfileImageUrl}
        alt={comment?.snippet?.authorDisplayName}
        style={{width:'60px',height:'60px',borderRadius:'50%'}}
        // sx={{width:{
        //   xs:'30px' , sm:'0px',md:'40px'
        // }, height:180}}
        />
        <Stack    style={{width:'80%'}} direction={'column'} flexWrap="wrap" justifyContent="start" gap={1}>
        <Link   style={{display:'flex',gap:'20px'}}  to={`/channel/${topLevelComment?.snippet?.authorChannelId.value}`}>
          
        <Typography color="#fff" variant="h5" fontSize={'15px'} fontWeight={"bold"}>
              {topLevelComment?.snippet?.authorDisplayName}  
            </Typography>
        <Typography color="gray" variant="h6" fontSize={'13px'}>
           {timeCalc(topLevelComment?.snippet?.publishedAt)}
            </Typography>
          </Link>
        <Typography color="#fff" variant="h5" fontSize={'14px'} >
              {topLevelComment?.snippet?.textOriginal}
            </Typography>

        </Stack>
    </Stack>
  )
}

export default CommentCard
