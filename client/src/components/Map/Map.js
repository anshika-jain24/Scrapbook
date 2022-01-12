import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './Map.css';
import {Button} from '@mui/material'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fpa2VzaGFyaSIsImEiOiJja2swdDYyanYwM3IwMm5xZjZlYm1kZmlsIn0.1ha1QjW98gYknER_3JqN6w';

const geocoder = new MapboxGeocoder({
    accessToken: 'pk.eyJ1Ijoic2Fpa2VzaGFyaSIsImEiOiJja2swdDYyanYwM3IwMm5xZjZlYm1kZmlsIn0.1ha1QjW98gYknER_3JqN6w',
    mapboxgl: mapboxgl
});

function Map() {

    const mapContainerRef = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(1.2);

    useEffect(() => {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/saikeshari/ckybb89qj83al14nudw2g0aby',
          center: [lng, lat],
          zoom: zoom
        });
    
        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-left');

        map.addControl(geocoder);
    
        map.on('move', () => {
          setLng(map.getCenter().lng.toFixed(4));
          setLat(map.getCenter().lat.toFixed(4));
          setZoom(map.getZoom().toFixed(2));
        });

        map.on('click', (event) => {
          // If the user clicked on one of your markers, get its information.
          const features = map.queryRenderedFeatures(event.point, {
            layers: ['tovisit'] // replace with your layer name
          });
          if (!features.length) {
            return;
          }
          const feature = features[0];

          const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            `<h3>${feature.properties.place_name}</h3>`
          )
          .addTo(map);
        
          // Code from the next step will go here.
        });

        geocoder.on('result', (e) => {
          console.log(e.result);
          const popups = document.getElementsByClassName("mapboxgl-popup");

            if (popups.length) {

                popups[0].remove();

            }
          const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(e.result.geometry.coordinates)
          .setHTML(
            `<h3>${e.result.place_name}</h3><button class="geocoder-result-btn">Add to Visited</button>`
          )
          .addTo(map);
        })

    
        // Clean up on unmount
        return () => map.remove();
      }, []); 
            

    return (
        <div ref={mapContainerRef} className="map-container" />
    )
}

export default Map
