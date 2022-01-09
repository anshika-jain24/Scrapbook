import React from 'react'
import './homepage.css'
import { Box } from '@mui/material';
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
            </Box>
        
        </>
    )
}

export default homepage
