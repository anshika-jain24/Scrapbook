import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Homepage from "./pages/Homepage/Homepage";
import Dashboard from "./pages/Dashboard/Dashboard";
import {ConfigureStore} from '../src/redux/configureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<PrivateOutlet1 />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to='/dashboard' />} />
          </Route>
          <Route path="/" element={<PrivateOutlet2 />}>
            <Route path="/home" element={<Homepage/>}/>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/" element={<Navigate to='/home' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

function PrivateOutlet1() {
  const creds = JSON.parse(localStorage.getItem('profile'));

  return creds ? <Outlet /> : <Navigate to="/home" />;
}

function PrivateOutlet2() {
  const creds = JSON.parse(localStorage.getItem('profile'));

  return !creds ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default App;
