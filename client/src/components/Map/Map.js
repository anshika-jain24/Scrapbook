import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./Map.css";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlacesToVisit,
  addPlacesToVisit,
  removePlaceToVisit,
} from "../../redux/ActionCreators/PlacesToVisit";

import { getPlacesVisited } from "../../redux/ActionCreators/PlacesVisited";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Fpa2VzaGFyaSIsImEiOiJja2swdDYyanYwM3IwMm5xZjZlYm1kZmlsIn0.1ha1QjW98gYknER_3JqN6w";

const geocoder = new MapboxGeocoder({
  accessToken:
    "pk.eyJ1Ijoic2Fpa2VzaGFyaSIsImEiOiJja2swdDYyanYwM3IwMm5xZjZlYm1kZmlsIn0.1ha1QjW98gYknER_3JqN6w",
  mapboxgl: mapboxgl,
});

function Map() {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(1.2);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlacesToVisit());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlacesVisited());
  }, [dispatch]);

  const placesToVisit = useSelector((state) => state.placesToVisit);
  const placesVisited = useSelector((state) => state.placesVisited);

  const [placesToVisitData, setPlacesToVisitData] = useState([]);
  const [placesVisitedData, setPlacesVisitedData] = useState([]);
  // console.log(placesToVisit);

  // console.log(placesToVisitData);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // console.log(placesToVisit)

    async function makeGeoJsonData() {
      await setPlacesToVisitData(
        placesToVisit.placesToVisitData.map((obj) => {
          return {
            type: "Feature",
            geometry: obj.location,
            properties: { name: obj.name },
            id: obj._id,
          };
        })
      );
    }

    if (placesToVisit.isLoaded) {
      // console.log(placesToVisit.placesToVisitData);

      makeGeoJsonData();

      // console.log(placesToVisitData);
    }
  }, [placesToVisit, dispatch]);

  useEffect(() => {
    // console.log(placesToVisit)

    async function makeGeoJsonData() {
      await setPlacesVisitedData(
        placesVisited.placesVisitedData.map((obj) => {
          return {
            type: "Feature",
            geometry: obj.place.location,
            properties: { name: obj.place.name },
            id: obj.place._id,
          };
        })
      );
    }

    // console.log(placesVisited)

    if (placesVisited.isLoaded) {
      // console.log(placesToVisit.placesToVisitData);

      makeGeoJsonData();

      // console.log(placesToVisitData);
    }
  }, [placesVisited, dispatch]);

  useEffect(() => {
    if (placesToVisit.isLoaded && placesVisited.isLoaded) {
      console.log("inside map");

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });

      const geojsonPlacesToVisit = {
        type: "FeatureCollection",
        features: placesToVisitData,
      };

      const geojsonPlacesVisited = {
        type: "FeatureCollection",
        features: placesVisitedData,
      };

      console.log(geojsonPlacesToVisit);

      console.log(geojsonPlacesVisited);

      map.on("load", () => {
        map.addSource("placesToVisit", {
          type: "geojson",
          data: geojsonPlacesToVisit,
        });
        map.addLayer({
          id: "places-to-visit",
          type: "fill",
          source: "placesToVisit",
          layout: {},
          paint: {
            "fill-color": "#f08",
            "fill-opacity": 0.4,
          },
        });

        map.addSource("placesVisited", {
          type: "geojson",
          data: geojsonPlacesVisited,
        });
        map.addLayer({
          id: "places-visited",
          type: "fill",
          source: "placesVisited",
          layout: {},
          paint: {
            "fill-color": "#f08",
            "fill-opacity": 0.4,
          },
        });
      });

      for (const feature of geojsonPlacesToVisit.features) {
        // create a HTML element for each feature
        const el = document.createElement("div");
        el.className = "markerToVisit";

        // console.log(feature);

        const name = feature.properties.name;
        const innerHtmlContent = `<div style="font-size: large;color : black;">
                          <h4 class="h4Class">${name} </h4> </div>`;

        const divElement = document.createElement("div");
        const removeToVisit = document.createElement("div");
        removeToVisit.innerHTML = `<button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root" >Remove from To Visit</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(removeToVisit);
        // btn.className = 'btn';
        removeToVisit.addEventListener("click", (e) => {
          dispatch(removePlaceToVisit(feature.id));
        });

        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(divElement)
          .addTo(map);

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(popup)
          .addTo(map);
      }

      for (const feature of geojsonPlacesVisited.features) {
        // create a HTML element for each feature
        const el = document.createElement("div");
        el.className = "markerVisited";

        // console.log(feature);

        const name = feature.properties.name;
        const innerHtmlContent = `<div style="font-size: large;color : black;">
                          <h4 class="h4Class">${name} </h4> </div>`;

        const divElement = document.createElement("div");
        const removeVisited = document.createElement("div");
        removeVisited.innerHTML = `<button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root" >Remove from Visited</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(removeVisited);
        // btn.className = 'btn';
        removeVisited.addEventListener("click", (e) => {
          console.log("clicked to remove visited place");
          // dispatch(removePlaceToVisit(feature.id));
        });

        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(divElement)
          .addTo(map);

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(popup)
          .addTo(map);
      }

      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      map.addControl(geocoder);

      map.on("move", () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });

      geocoder.on("result", (e) => {
        // console.log(e.result);

        const res = e.result;
        const popups = document.getElementsByClassName("mapboxgl-popup");

        if (popups.length) {
          popups[0].remove();
        }

        const name = e.result.place_name;
        const innerHtmlContent = `<div style="font-size: large;color : black;">
                          <h4 class="h4Class">${name} </h4> </div>`;

        const divElement = document.createElement("div");
        const addToVisitbtn = document.createElement("div");
        addToVisitbtn.innerHTML = `<button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root" >Add To Visit</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(addToVisitbtn);
        // btn.className = 'btn';
        addToVisitbtn.addEventListener("click", (e) => {
          // console.log(res);
          const obj = { name: res.place_name, location: res.geometry };
          // console.log(obj);
          dispatch(addPlacesToVisit(obj));
        });

        // const divElement1 = document.createElement("div");
        const addVisitedbtn = document.createElement("div");
        addVisitedbtn.innerHTML = `<button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root" >Add To Visited</button>`;
        // divElement1.innerHTML = innerHtmlContent;
        divElement.appendChild(addVisitedbtn);
        // btn.className = 'btn';
        addVisitedbtn.addEventListener("click", (e) => {
          // console.log(res);
          const obj = { name: res.place_name, location: res.geometry };
          console.log("Clicked to add to visietd");
          // dispatch(addPlacesToVisit(obj));
        });

        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(e.result.geometry.coordinates)
          .setDOMContent(divElement)
          .addTo(map);
      });

      setMapLoaded(true);

      // Clean up on unmount
      return () => map.remove();
    }
  }, [placesToVisitData, placesVisitedData]);

  return (
    <>
      {/* <div className='map-container-loader'><CircularProgress className="map-loader"/></div> */}
      {!mapLoaded ? (
        <div className="map-container-loader">
          <CircularProgress className="map-loader" />
        </div>
      ) : (
        <></>
      )}
      <div ref={mapContainerRef} className="map-container" />
    </>
    // <div ref={mapContainerRef} className="map-container" />
  );
}

export default Map;
