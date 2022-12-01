import React, { useEffect } from "react";
import "../Footer/Footer.css";
import { Grid, Slider } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { useStateValue } from "../../StateProvider/StateProvider";
import axios from "axios";
import FooterControls from "./FooterControls";

const Footer = () => {
  // pass token, currntPlaying, playerState form the StateProvider
  const [{ token, currentPlaying }, dispatch] = useStateValue();

  useEffect(() => {
    // create a fucntion of getCurrentPlaying
    const getCurrentlyPlaying = async () => {
      // get or fetch the current playing track
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
      // response.data should be a new variable called tem
      const item = response.data;
      // dispatich the item into the reducer
      dispatch({
        type: "SET_CURRENTLY_PLAYING",
        currentPlaying: item,
      });

      console.log("I am currently playing", item);
    };

    // call the getcurrentPlaying() function
    getCurrentlyPlaying();

    // once each time it load token and dispatch
  }, [token, dispatch]);

  return (
    <div className="footer">
      {currentPlaying ? (
        <div>
          <div className="footer_left">
            <img
              className="footer_albumImg"
              src={currentPlaying?.item?.album?.images[1].url}
              alt={currentPlaying?.item?.album?.name}
            />
            <div className="footer_songInfo">
              <h4>{currentPlaying?.item?.album?.name}</h4>
              <p>{currentPlaying?.item?.name}</p>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="footer_noSongs">No Songs Playing...</h4>
      )}

      <div className="footer_center">
        <FooterControls />
      </div>

      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>

          <Grid item xs>
            <Slider className="footer_slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
