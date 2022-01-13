import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./Map.css";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPlacesToVisit } from "../../redux/ActionCreators/PlacesToVisit";

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

  const placesToVisit = useSelector((state) => state.placesToVisit);

  const [placesToVisitData, setPlacesToVisitData] = useState([]);
  console.log(placesToVisit);

  console.log(placesToVisitData);

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
          };
        })
      );
    }

    if (placesToVisit.placesToVisitData.length > 0) {
      console.log(placesToVisit.placesToVisitData);

      makeGeoJsonData();

      console.log(placesToVisitData);
    }
  }, [placesToVisit, dispatch]);

  useEffect(() => {
    if (placesToVisitData.length > 0) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });

      const geojson = {
        type: "FeatureCollection",
        features: placesToVisitData,
      };

      map.on("load", () => {
        map.addSource("placesToVisit", {
          type: "geojson",
          data: geojson,
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
      });

      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement("div");
        el.className = "marker";

        console.log(feature.properties.name);

        const name = feature.properties.name;
        const innerHtmlContent = `<div style="font-size: large;color : black;">
                          <h4 class="h4Class">${name} </h4> </div>`;

        const divElement = document.createElement("div");
        const assignBtn = document.createElement("div");
        assignBtn.innerHTML = `<button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root" >Remove from To Visit</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(assignBtn);
        // btn.className = 'btn';
        assignBtn.addEventListener("click", (e) => {
          console.log("Button clicked" + name);
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
        console.log(e.result);
        const popups = document.getElementsByClassName("mapboxgl-popup");

        if (popups.length) {
          popups[0].remove();
        }

        const name = e.result.place_name;
        const innerHtmlContent = `<div style="font-size: large;color : black;">
                          <h4 class="h4Class">${name} </h4> </div>`;

        const divElement = document.createElement("div");
        const assignBtn = document.createElement("div");
        assignBtn.innerHTML = `<button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root" >Add To Visit</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(assignBtn);
        // btn.className = 'btn';
        assignBtn.addEventListener("click", (e) => {
          console.log("Button clicked" + name);
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
  }, [placesToVisitData]);

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
