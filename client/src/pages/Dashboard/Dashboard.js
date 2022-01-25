import React from "react";
import ButtonAppBar from "../../components/Navbar";
import Map from "../../components/Map/Map";
import { Button } from "@mui/material";
import Form from "../../components/Form/Form";

function Dashboard() {
  return (
    <>
      <ButtonAppBar />
      <Form />
      <Map />
      <Button variant="contained">Hello</Button>
    </>
  );
}

export default Dashboard;
