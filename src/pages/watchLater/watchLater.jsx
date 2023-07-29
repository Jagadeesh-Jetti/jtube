import React, { useContext } from "react";
import { SideNav } from "../../components/sideNav/sideNav";
import { videoContext } from "../../contexts/videoContext";
import { useNavigate, useParams } from "react-router-dom";

export const WatchLater = () => {
  const { state, dispatch } = useContext(videoContext);
  const { categorySelected } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <SideNav />
      </div>
      <div className="listing-container">
        {/* <div className="listing-header">{categorySelected}</div> */}
        <div className="listing-layout">
          {state.watchLater.map((video) => (
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
                    dispatch({
                      type: "REMOVE_FROM_WATCH_LATER",
                      payload: video._id,
                    });
                  }}
                >
                  Remove from watchlater
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
