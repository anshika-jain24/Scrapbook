import React from "react";
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/signIn" exact element={<SignIn />} />
                <Route path="/signUp" exact element={<SignUp />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
