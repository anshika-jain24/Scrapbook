import React from "react";
import ButtonAppBar from "../../components/Navbar";
import Map from "../../components/Map/Map";
import { Button } from "@mui/material";

function Dashboard() {
  return (
    <>
      <ButtonAppBar />
      <Map />
    </>
  );
}

export default Dashboard;
