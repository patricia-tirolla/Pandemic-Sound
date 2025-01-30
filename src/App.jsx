
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Main from "./Components/Main/Main";

import Homepage from "./Components/Homepage/HomepageComponent";
import PlaylistDisplay from "./Components/PlaylistDisplay/PlaylistDisplay";
import AuthCallback from "./Components/AuthCallback/AuthCallbackComponent";
import LandingPage from "./Components/LandingPage/LandingPageComponent";
import SearchPage from "./Components/SearchPage/SearchPageComponent";
import "./styles/reset.css";
import "./styles/App.css";

function App() {
  return (

  <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/callback" element={<AuthCallback />} />

        <Route element={<Main />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="playlist/:name" element={<PlaylistDisplay />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
      </div>
  );
}

export default App;