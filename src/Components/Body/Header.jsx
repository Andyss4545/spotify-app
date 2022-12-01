import React, { useEffect, useState } from "react";
import "../Body/Header.css";
import SearchSharp from "@mui/icons-material/SearchSharp";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useStateValue } from "../../StateProvider/StateProvider";

const Header = () => {
  // set the user from the reducer
  const [{ user, token }, dispatch] = useStateValue();
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const user = response.data;
      // console.log(user);

      dispatch({
        type: "SET_USER",
        user: user,
      });
    };

    getCurrentUser();
  }, [token, dispatch]);

  return (
    <div className={navbar ? `header active` : "header"}>
      <div className="header_left">
        <SearchSharp />
        <input type="text" placeholder="Search for Artists, Songs, Albums" />
      </div>

      <div className="header_right">
        {/** tell get spotify user name and image */}
        <Avatar
          className="header_avatar"
          src={user?.images[0]?.url}
          alt={user?.display_name}
        />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
