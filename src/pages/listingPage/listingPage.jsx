import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { videos } from "../../backend/videos";
import { SideNav } from "../../components/sideNav/sideNav";
import "../listingPage/listingPage.css";
import { videoContext } from "../../contexts/videoContext";

export const ListingPage = () => {
  const { categorySelected } = useParams();
  const navigate = useNavigate();
  const { dispatch, inWatchlater } = useContext(videoContext);

  const selectedVideos = videos.filter(
    (video) => video.category === categorySelected
  );

  return (
    <div className="listing-main-container">
      <div>
        <SideNav />
      </div>
      <div className="listing-container">
        <div className="listing-header">{categorySelected}</div>
        <div className="listing-layout">
          {selectedVideos.map((video) => (
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
