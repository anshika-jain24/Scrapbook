import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './Map.css';
import {Button} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {getPlacesToVisit} from '../../redux/ActionCreators/PlacesToVisit';

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
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPlacesToVisit());
    }, [dispatch])

    const placesToVisit= useSelector( (state) => state.placesToVisit);
    console.log(placesToVisit);

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
          console.log(features);
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

            const name = e.result.place_name;
            const innerHtmlContent = `<div style="min-width: 600px;font-size: large;color : black;">
                        <h4 class="h4Class">${name} </h4> </div>`;
            
            const divElement = document.createElement('div');
            const assignBtn = document.createElement('div');
            assignBtn.innerHTML = `<button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root" >Add To Visit</button>`;
            divElement.innerHTML = innerHtmlContent;
            divElement.appendChild(assignBtn);
            // btn.className = 'btn';
            assignBtn.addEventListener('click', (e) => {
              console.log('Button clicked' + name);
            });
          
          const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(e.result.geometry.coordinates)
          .setDOMContent(divElement)
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
