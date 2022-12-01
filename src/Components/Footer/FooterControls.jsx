import React, { useEffect } from "react";
import "../Footer/FooterControls.css";
import { PlayCircleOutline } from "@mui/icons-material";
import { SkipPrevious } from "@mui/icons-material";
import { SkipNext } from "@mui/icons-material";
import { Shuffle } from "@mui/icons-material";
import { PauseCircle } from "@mui/icons-material";
import { Repeat } from "@mui/icons-material";
import axios from "axios";
import { useStateValue } from "../../StateProvider/StateProvider";

const FooterControls = () => {
  // import the initial state from the reducer
  let [{ token, playing, currentPlaying, playerState }, dispatch] =
    useStateValue();

  // tell the broser to change currently playing track when next or previos icon is clicked
  const changeTrack = async (type) => {
    // tell the browser to post request to next or previous track
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        // import headers for the api and at token to bearer for the api to work
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    // get curentPlaying track from the spotify api
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        // import headers for the api and at token to bearer for the api to work
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    // if response.data is not equal to empty data then let item be the new response.data

    if (response.data !== "") {
      const { item } = response.data;
      const currentPlaying = {
        id: item?.id,
        name: item?.name,
        artists: item?.album?.name,
        album: item?.album?.images[1].url,
      };
      // dispatich the item into the reducer
      dispatch({
        type: "SET_CURRENTLY_PLAYING",
        currentPlaying: currentPlaying,
      });
    } else {
      // otherwise set currentPlaying to null or nothing
      dispatch({
        type: "SET_CURRENTLY_PLAYING",
        currentPlaying: null,
      });
    }
  };

  const changeState = async () => {
    // if playerState exist then pause otherwise play
    const state = playerState ? "pause" : "play";

    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        // import headers for the api and at token to bearer for the api to work
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    // return playerState as false when dispatch

    dispatch({
      type: "SET_PLAYER_STATE",
      playerState: !playerState,
    });
  };

  return (
    <div className="footer_controls">
      <Shuffle className="footer_green" />
      <SkipPrevious
        onClick={() => changeTrack("previous")}
        className="footer_icon"
      />
      {playerState ? (
        <PauseCircle
          onClick={changeState}
          fontSize="Large"
          className="footer_icon"
        />
      ) : (
        <PlayCircleOutline
          onClick={changeState}
          fontSize="large"
          className="footer_icon"
        />
      )}

      <SkipNext onClick={() => changeTrack("next")} className="footer_icon" />
      <Repeat className="footer_green" />
    </div>
  );
};

export default FooterControls;
