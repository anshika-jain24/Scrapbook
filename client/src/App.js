import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import {ConfigureStore} from '../src/redux/configureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
            <Routes>
                <Route path="/signIn" exact element={<SignIn />} />
                <Route path="/signUp" exact element={<SignUp />} />
            </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
