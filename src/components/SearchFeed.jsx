import { useState, useEffect } from 'react'
import {Box,Typography} from '@mui/material'
import {useParams} from 'react-router-dom'
import { Videos} from './'
import { fetchFromAPI } from '../utils/fetchFromAPI.js'

const SearchFeed = () => {
  const [videos,setVideos]=useState([]);
  const {searchTerm} = useParams();
  useEffect(()=>{
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
    .then((data)=>setVideos(data.items))
  },[searchTerm])
  return (
    <Box p={1} sx={{overflowY:'auto', 
    height:'90vh', flex:2}}>
        <Typography varient="h4" fontWeight="bold" mb={2} fontSize="1.5rem" sx={{
          color:'white'
        }}>Search Resutls for: 
          <span style={{color:'#f31503',paddingLeft:'5px'}} >{searchTerm}</span> videos

        </Typography>
          <Videos videos={videos}/>

      </Box>
  )
}

export default SearchFeed
