import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { videos } from "../../backend/videos";
import { SideNav } from "../../components/sideNav/sideNav";
import { videoContext } from "../../contexts/videoContext";
import "../explore/explore.css";

export const Explore = () => {
  const navigate = useNavigate();
  const { inWatchlater, dispatch } = useContext(videoContext);
  const { categorySelected } = useParams();

  const [searchInput, setSearchInput] = useState("");

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="explore-main-container">
      <div>
        <SideNav />
      </div>
      <div className="listing-container">
        <div className="listing-header"> Explore </div>
        <div>
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search videos..."
            className="search-input"
          />
        </div>
        <div className="listing-layout">
          {filteredVideos.map((video) => (
            <div
              className="listing-card"
              key={video.id}
              onClick={() =>
                navigate(`/listing/${categorySelected}/${video._id}`)
              }
            >
              <div>
                <img
                  src={video.thumbnail}
                  alt="loading"
                  className="category-thumbnail"
                />
              </div>
              <div className="listing-card-content">
                <div className="listing-image-container">
                  <img
                    src={video.thumbnail}
                    className="listing-image"
                    alt="loading"
                  />
                </div>
                <div className="listing-title">{video.title}</div>
              </div>
              <div className="listing-footer">
                <div> {video.views} </div>
                <div> {video.creator} </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    inWatchlater(video._id)
                      ? dispatch({
                          type: "REMOVE_FROM_WATCH_LATER",
                          payload: video._id,
                        })
                      : dispatch({
                          type: "ADD_TO_WATCH_LATER",
                          payload: video._id,
                        });
                  }}
                >
                  {inWatchlater(video._id)
                    ? "remove from watchlater"
                    : "add to watchlater"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
