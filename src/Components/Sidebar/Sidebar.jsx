import React, { useEffect } from "react";
import "../Sidebar/Sidebar.css";
import SidebarOption from "../Sidebar/SidebarOption";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import { useStateValue } from "../../StateProvider/StateProvider";
import axios from "axios";

const Sidebar = () => {
  // pull the playlists from the datalayer i.e StateProvider
  // const [{ playlists }, dispatch] = useStateValue();

  const [{ playlists, token }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchPlaylist = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const items = response.data;
      // console.log(items);

      dispatch({
        type: "SET_PLAYLIST",
        playlists: items,
      });
    };

    fetchPlaylist();
  }, [token, dispatch]);

  return (
    <div className="sidebar">
      <img
        className="sidebar_logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />

      <SidebarOption Icon={<HomeSharpIcon />} title="Home" />
      <SidebarOption Icon={<SearchSharpIcon />} title="Search" />
      <SidebarOption Icon={<LibraryMusicSharpIcon />} title="Your library" />
      <br />
      <strong className="sidebar_playlist">PLAYLIST</strong>
      <hr />

      {/**map throug the playlists and display them on the sidebar  */}
      {playlists?.items?.map((playlist) => {
        return <SidebarOption title={playlist?.name} />;
      })}
      <SidebarOption title="Hip hop" />
      <SidebarOption title="Rock n Roll" />
      <SidebarOption title="RnB" />
    </div>
  );
};

export default Sidebar;
