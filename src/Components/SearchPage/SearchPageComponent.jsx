import React from "react";
import { useNavigate } from "react-router";
import useFetch from "../../Hooks/useFetch";
import "./searchpage.css"

const SearchPage = () => {
    const params = new URLSearchParams(window.location.search);
    const token = localStorage.getItem("accessToken");
    const searchValue = params.get("q");
    const url = "https://api.spotify.com/v1/search?q=" + searchValue + "&type=artist%2Ctrack%2Calbum&limit=5";
    const { data: result, error, loading } = useFetch(url, token);
    const navigate = useNavigate();

    function onTrackClick(trackId) {
        navigate("/track/" + trackId);
    }

    return (
        <div className="search-container">
            {error &&
                <div className="error-message">Error: {error}</div>
            }
            {result && !loading &&
                <div className="search-results">
                    <ul className="search-list">
                        {result?.tracks?.items?.map((item) => (
                            <li key={item.id} className="single-track-container">
                                <a href={item.id} target="_blank" rel="noopener noreferrer" onClick={() => onTrackClick(item.id)}>
                                    <div className="track-info">
                                        <img
                                            className="track-image"
                                            src={item.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                                            alt="Album Art"
                                        />
                                        <div className="track-details">
                                            <p className="track-name">{item.name}</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
};

export default SearchPage;
