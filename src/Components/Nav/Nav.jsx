import React from "react";
import SearchBar from "../SearchPage/SearchBarComponent";
import { useProfile } from "../../Hooks/Profile";
import { isUserAutheticated } from "../AuthCallback/script";
import "./nav.css";

const Nav = () => {
  const profile = useProfile(); 

  return (
    <div className="Nav">
      <h1 className="logo">Pandemic Sound</h1>
      <SearchBar />

      {isUserAutheticated() && profile?.images?.[0]?.url && (
        <div className="profile-container">
          <img
            src={profile.images[0].url}
            alt="Profile"
            className="profile-image"
          />
        </div>
      )}
    </div>
  );
};

export default Nav;
