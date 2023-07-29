import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { videos } from "../../backend/videos";
import { SideNav } from "../../components/sideNav/sideNav";
import "../videoDetail/videoDetail.css";
import { videoContext } from "../../contexts/videoContext";

export const VideoDetail = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [notesText, setNotesText] = useState("");
  const { state, dispatch, inWatchlater } = useContext(videoContext);
  const { videoSelected, categorySelected } = useParams();
  const navigate = useNavigate();

  const selectedVideo = videos.find(
    (video) => Number(video._id) === Number(videoSelected)
  );

  if (!selectedVideo) {
    return <div>Video not found</div>;
  }

  const handleToggleNotes = () => {
    setShowNotes(!showNotes);
  };

  const handleNotesChange = (e) => {
    setNotesText(e.target.value);
  };

  const handleSaveNotes = () => {
    console.log("Notes saved:", notesText);

    setShowNotes(false);
  };

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
          <button onClick={handleToggleNotes}>
            {showNotes ? "Hide Notes" : "Add Notes"}
          </button>
          <button>Save to Playlist</button>
        </div>
        <div>{notesText}</div>
        {showNotes && (
          <div>
            <textarea
              value={notesText}
              onChange={handleNotesChange}
              placeholder="Add your notes here..."
            />
            <button onClick={handleSaveNotes}>Save Notes</button>
          </div>
        )}
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
              key={video.id}
            >
              <div>
                <img
                  src={video.thumbnail}
                  alt="loading"
                  className="morevideos-image"
                />
              </div>
              <div className="morevideos-content">
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
