import { useState, useEffect } from 'react'
import {Box, Stack, Typography} from '@mui/material'
import {SideBar, Videos} from './'
import { fetchFromAPI } from '../utils/fetchFromAPI.js'

const Feed = () => {
  const [selectedCategory, setSelectedCategory]=useState('Tech')
  const [videos,setVideos]=useState([]);
  useEffect(()=>{
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
    .then((data)=>setVideos(data.items))
  },[selectedCategory])
  
  return (
    <Stack sx={{flexDirection:{sx: 
    "column", md:"row"}}}>
      <Box sx={{height:{
        sx:'auto',md:'92vh'
      }, borderRight:'1px solid #3d3d3d', px:{sx: 0, md:1}}}>
        <SideBar
        selectedCategory=
        {selectedCategory}
        setSelectedCategory={setSelectedCategory}/>
        <Typography className='copyright'
        variant="body2" sx={{mt:1.5, color:'#fff'}}>
          Copyright 2022 Harshpreet
        </Typography>
      </Box>
      <Box p={1} sx={{overflowY:'auto', 
    height:'90vh', flex:2}}>
        <Typography varient="h4" fontWeight="bold" mb={2} fontSize="1.5rem" sx={{
          color:'white'
        }}>{selectedCategory}
          <span style={{color:'#f31503',paddingLeft:'5px'}} >Videos</span>

        </Typography>
          <Videos videos={videos}/>

      </Box>
    </Stack>
  )
}

export default Feed
