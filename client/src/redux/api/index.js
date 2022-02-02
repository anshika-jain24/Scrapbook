import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${localStorage.getItem("profile")}`;
  }
  return req;
});

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const signIn = (email, password) =>
  API.post("/api/auth/login", { email, password });
export const signUp = (email, password, name) =>
  API.post("/api/auth/signup", { email, password, name });
export const fetchPlaces = () => API.get("/api/places");
export const fetchPlacesToVisit = () => API.get("/api/placesToVisit");
export const createPlacesToVisit = (place) =>
  API.post("/api/placesToVisit", { place });
export const deletePlaceToVisit = (placeID) =>
  API.patch("/api/placesToVisit", { placeID });
  
  export const fetchPlacesVisited = () => API.get("/api/placesVisited");
  export const createPlacesVisited = (place) =>
  API.post("/api/placesVisited", place, config);
  export const deletePlacesVisited = (placeID) =>
    API.delete("/api/placesVisited", { placeID });

export const uploadFile = (obj) => API.post("/api/upload", obj, config);
