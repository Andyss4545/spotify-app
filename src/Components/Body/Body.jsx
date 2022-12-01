import React, { useEffect } from "react";
import "../Body/Body.css";
import { PlayCircleFilled } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import { MoreHorizOutlined } from "@mui/icons-material";
import Header from "../Body/Header";
import { useStateValue } from "../../StateProvider/StateProvider";
import axios from "axios";
import SongRow from "./SongRow";

const Body = ({ spotify }) => {
  // import useStateValue from stateProvider
  const [{ token, discover_weekly }, dispatch] = useStateValue();

  const discoverId = "37i9dQZEVXcGUO6IQRdrAW";

  useEffect(() => {
    // tell the browser to get data from the spotify api url
    const getDiscoverWeekly = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${discoverId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      // const items = response.data;

      // tell the browser to get the desired data from the response
      let selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        images: response.data.images[0].url,
        tracks: response.data.tracks,
      };
      console.log("I am discover weekly", selectedPlaylist);

      // dispatch the selectedPlaylist into the reducer
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: selectedPlaylist,
      });
    };

    getDiscoverWeekly();
    // pass token, dispatch as dependencies array values
  }, [token, discoverId, dispatch]);

  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body_info">
        <img src={discover_weekly?.images} alt="" />
        <div className="body_infoText">
          <strong>PLAYLIST</strong>
          <h2>{discover_weekly?.name}</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilled className="body_shuffle" />
          <Favorite className="body_favorite" fontSize="large" />
          <MoreHorizOutlined className="" />
        </div>
      </div>
      {/** List of songs */}

      <div className="body_heading">
        <h4>TITLE</h4>
        <h4>ALBUM</h4>
        <h4>DATE ADDED</h4>
      </div>
      <hr />

      {discover_weekly?.tracks?.items.map((item) => {
        return (
          <div>
            <SongRow title="TITLE" track={item.track} />
          </div>
        );
      })}
    </div>
  );
};

export default Body;
