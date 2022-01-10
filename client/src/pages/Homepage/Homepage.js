import React from 'react';
import './homepage.css'
import { Box, Typography } from '@mui/material';
import Map from '../../components/Map';

function Homepage() {


    return (
        <>
            <Box className='homepageBanner'>
                {/* <Box sx={{
                    float:'right',
                    padding:'0.7em'
                }}>
                    <Button variant='contained'>Sign In</Button>
                </Box> */}
                <Box className='bannerText'>
                    <Typography className='bannerHeading'>
                        Travel <br/>Tales
                    </Typography>

                    <Typography className='bannerSubText'>
                        Narrate your Own Tale
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                p:2
            }}>
                <Typography variant="h3">
                    Explore
                </Typography>
                <Map/>
            </Box>

            
        
        </>
    )
}

export default Homepage
