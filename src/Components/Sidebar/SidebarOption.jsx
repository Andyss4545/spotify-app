import React from "react";
import "../Sidebar/SidebarOption.css";

const SidebarOption = ({ title, Icon }) => {
  return (
    <div className="sidebarOption">
      {/**if Icon exist then display Icon and style it */}
      {Icon && <div className="sidebarOption_Icon">{Icon}</div>}

      {/**if Icon exist show h4 otherwise show p tag */}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
};

export default SidebarOption;
