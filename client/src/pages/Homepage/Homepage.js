import React from 'react'
import './homepage.css'
import { Box, Typography } from '@mui/material';
import { Button } from '@mui/material';

function homepage() {
    return (
        <>
            <Box className='homepageBanner'>
                <Box sx={{
                    float:'right',
                    padding:'0.7em'
                }}>
                    <Button variant='contained'>Sign In</Button>
                </Box>
                <Box className='bannerText'>
                    <Typography className='bannerHeading'>
                        Travel <br/>Tales
                    </Typography>

                    <Typography className='bannerSubText'>
                        Narrate your Own Tale
                    </Typography>
                </Box>
            </Box>

            
        
        </>
    )
}

export default homepage
