import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useParams,
} from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Homepage from "./pages/Homepage/Homepage";
import Dashboard from "./pages/Dashboard/Dashboard";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import UploadImageToS3WithReactS3 from "./pages/UploadImageToS3WithReactS3 ";
import Form from "./components/Form/Form";
import { getPlacesToVisit } from "./redux/ActionCreators/PlacesToVisit";

import { getPlacesVisited } from "./redux/ActionCreators/PlacesVisited";
import Visited from "./pages/Visited";

const PlaceRender = () => {
  const placesVisited = useSelector(
    (state) => state.placesVisited.placesVisitedData
  );
  const { place } = useParams();

  const found = placesVisited.filter((item) => item._id === place);

  if (found.length === 0) {
    console.log("No such place");
    return <Dashboard />;
  }

  return <Visited place={found[0]} />;
};

function App() {
  const creds = localStorage.getItem("profile");
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (creds) {
      dispatch(getPlacesToVisit());
      dispatch(getPlacesVisited());
    }
  }, [creds, dispatch]);


  return (
    <>
      {loadingStatus && <LinearProgress />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateOutlet1 />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadImageToS3WithReactS3 />} />
            <Route path="/add" element={<Form />} />
            <Route path="/placesVisited/:place" element={<PlaceRender />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
          <Route path="/" element={<PrivateOutlet2 />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function PrivateOutlet1() {
  const creds = localStorage.getItem("profile");

  return creds ? <Outlet /> : <Navigate to="/home" />;
}

function PrivateOutlet2() {
  const creds = localStorage.getItem("profile");

  return !creds ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default App;
