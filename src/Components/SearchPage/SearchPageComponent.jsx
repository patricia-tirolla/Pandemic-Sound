import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import usePlaylistFetch from "../../Hooks/usePlaylistFetch";
import useSaveTrack from "../../Hooks/useSaveTrack";
import AddToPlaylistButton from "../AddSongToPlaylist/AddToPlaylistButton";
import AddToSavedTracks from "../AddSongToPlaylist/AddToSavedTracks";
import "./searchpage.css";

const SearchPage = () => {
  const [activeTrackId, setActiveTrackId] = useState(null);
  const navigate = useNavigate();
  const { trackId } = useParams();
  const token = localStorage.getItem("accessToken");

  const params = new URLSearchParams(window.location.search);
  const searchValue = params.get("q");
  const searchUrl = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Calbum&limit=5`;

  const { data: result, loading, error: searchError } = useFetch(searchUrl, token);
  const {  error: trackError } = useFetch(`https://api.spotify.com/v1/tracks/${trackId}`, token);
  const { playlists } = usePlaylistFetch();
  const {  error: saveError } = useSaveTrack();

  const onTrackClick = (trackId) => navigate(`/track/${trackId}`);
  const toggleDropdown = (trackId) => setActiveTrackId(prev => prev === trackId ? null : trackId);

  if (searchError || trackError || saveError) {
    return <div className="error-message">Error: {searchError || trackError || saveError}</div>;
  }

  return (
    <div className="search-container">
      {result && !loading && (
        <div className="search-results">
          <ul className="search-list">
            {result?.tracks?.items?.map((track) => (
              <li key={track.id} className="single-track-container">
                <a href={`#${track.id}`} onClick={() => onTrackClick(track.id)}>
                  <div className="track-info">
                    <img
                      className="track-image"
                      src={track.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                      alt="Album Art"
                    />
                  </div>
                </a>
                <div className="track-details">
                  <p className="track-name">{track.name}</p>
                  <AddToSavedTracks
                    track={track}
                    playlists={playlists}
                    activeTrackId={activeTrackId}
                  />
                  <AddToPlaylistButton
                    track={track}
                    playlists={playlists}
                    activeTrackId={activeTrackId}
                    toggleDropdown={toggleDropdown}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
