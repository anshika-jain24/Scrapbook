import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5zaGlrYWphaW4yNCIsImEiOiJja3kwMTgwdDgzYWQwMnBwNGljMTFsY2V0In0.CPC6J0E9RW2NfvJHbHZ7Eg';

const geocoder = new MapboxGeocoder({
    accessToken: 'pk.eyJ1IjoiYW5zaGlrYWphaW4yNCIsImEiOiJja3kwMTgwdDgzYWQwMnBwNGljMTFsY2V0In0.CPC6J0E9RW2NfvJHbHZ7Eg',
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
          style: 'mapbox://styles/mapbox/streets-v11',
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
            layers: ['ToVisit'] // replace with your layer name
          });
          if (!features.length) {
            return;
          }
          const feature = features[0];

          const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
          .addTo(map);
        
          // Code from the next step will go here.
        });

    
        // Clean up on unmount
        return () => map.remove();
      }, []); 
            

    return (
        <div ref={mapContainerRef} className="map-container" />
    )
}

export default Map
