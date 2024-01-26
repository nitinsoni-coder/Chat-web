import React from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { BiSolidContact } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";
import { MdWebStories, MdQuickreply } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import logo from "../../assets/images/logo.png";

import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="leftBox">
        <div className="logoBox">
          <img src={logo} alt="logo" />
        </div>
        <IoChatboxEllipses className="navbar-icons" />
        <BiSolidContact className="navbar-icons" />
        <FaDiscord className="navbar-icons" />
        <MdWebStories className="navbar-icons" />
      </div>

      <div className="rightBox">
        <MdQuickreply className="navbar-icons" />
        <IoIosNotifications className="navbar-icons" />
        <div>p</div>
      </div>
    </div>
  );
};

export default Navbar;
