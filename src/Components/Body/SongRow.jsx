import React from "react";
import "../Body/SongRow.css";

const SongRow = ({ track, title }) => {
  //   let receivedSong = () => {
  //     track();
  //   };
  return (
    <div className="songRow">
      <img
        className="songRow_album"
        src={track?.album?.images[0]?.url}
        alt=""
      />

      <div className="songRow_info">
        <div className="songRow_song">
          <h3>{track.name}</h3>
          <p>
            {track?.artists?.map((artist) => artist.name).join(", ")}{" "}
            {track?.album?.name}
          </p>
        </div>

        <div className="songRow_albumTitile">
          <p>{track?.album?.name}</p>
        </div>

        <div className="songRow_Added">
          <p>7 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default SongRow;
