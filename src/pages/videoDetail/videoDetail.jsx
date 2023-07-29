import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { videos } from "../../backend/videos";
import { SideNav } from "../../components/sideNav/sideNav";
import "../videoDetail/videoDetail.css";
import { videoContext } from "../../contexts/videoContext";

export const VideoDetail = () => {
  const { state, dispatch, inWatchlater } = useContext(videoContext);
  const { videoSelected, categorySelected } = useParams();
  const navigate = useNavigate();

  const selectedVideo = videos.find(
    (video) => Number(video._id) === Number(videoSelected)
  );

  if (!selectedVideo) {
    return <div>Video not found</div>;
  }

  return (
    <div className="videodetail-main-container">
      <div>
        <SideNav />
      </div>

      <div className="videodetail-page">
        <div className="video-container">
          <iframe
            title={selectedVideo.title}
            className="video"
            src={selectedVideo.src}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="listing-main-content">
          <div className="listing-image-container">
            <img
              src={selectedVideo.thumbnail}
              className="listing-image"
              alt="loading"
            />
          </div>

          <div>
            <h2>{selectedVideo.title}</h2>
            <div className="listing-main-middle-content">
              <p>Views: {selectedVideo.views}</p>
              <p>Creator: {selectedVideo.creator}</p>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                inWatchlater(selectedVideo?._id)
                  ? dispatch({
                      type: "REMOVE_FROM_WATCH_LATER",
                      payload: selectedVideo._id,
                    })
                  : dispatch({
                      type: "ADD_TO_WATCH_LATER",
                      payload: selectedVideo._id,
                    });
              }}
            >
              {inWatchlater(selectedVideo?._id)
                ? "remove from watchlater"
                : "add to watchlater"}
            </button>
            <button>take notes </button>
            <button>save to playlist</button>
          </div>
        </div>
      </div>

      <div>
        <div className="videodetail-title"> More Videos: </div>
        <div>
          {videos.map((video) => (
            <div
              className="videodetail-card"
              onClick={() =>
                navigate(`/listing/${categorySelected}/${video._id}`)
              }
            >
              <div>
                <img src={video.thumbnail} alt="loading" />
              </div>
              <div>
                <div className="videodetail-title">{video.title}</div>
                <div>{video.creator}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
