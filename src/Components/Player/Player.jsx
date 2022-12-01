import React from "react";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import "../Player/Player.css";

const Player = ({ spotify }) => {
  return (
    <div className="player">
      <div className="player_body">
        <Sidebar />

        <Body spotify={spotify} />
      </div>

      <Footer />
    </div>
  );
};

export default Player;
