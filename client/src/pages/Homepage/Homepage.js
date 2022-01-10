import React, { useRef, useEffect, useState } from 'react';
import './homepage.css'
import { Box, Typography } from '@mui/material';
import { Button } from '@mui/material';
import mapboxgl from 'mapbox-gl'; 

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5zaGlrYWphaW4yNCIsImEiOiJja3kwMTgwdDgzYWQwMnBwNGljMTFsY2V0In0.CPC6J0E9RW2NfvJHbHZ7Eg';


function Homepage() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(1.5);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });
        });

        useEffect(() => {
            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
            });
            });

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
                <div ref={mapContainer} className="map-container" />
            </Box>

            
        
        </>
    )
}

export default Homepage
