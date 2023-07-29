import { useNavigate } from "react-router-dom";
import "../sideNav/sideNav.css";

export const SideNav = () => {
  const navigate = useNavigate();

  return (
    <div className="sidenav-main-container">
      <div className="sidenav-inner-container">
        <div className="snc-elements" onClick={() => navigate("/")}>
          Home
        </div>
        <div className="snc-elements"> Explore </div>
        <div className="snc-elements"> Playlists </div>
        <div className="snc-elements" onClick={() => navigate("/watchlater")}>
          watch later
        </div>
      </div>
    </div>
  );
};
