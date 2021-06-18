import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/Navbar.module.css";
import Form from "react-bootstrap/Form";
import Login from "./Navbar/login";
import Register from "./Navbar/register";
const mainStyle = {
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
};
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (str) => {
    setOpen(true);
    setSelected(str);
  };
  return (
    <div style={mainStyle}>
      <div style={{ position: "absolute", left: 40 }}>
        <p
          style={{
            fontSize: 20,
            fontFamily: "Poppins",
            fontWeight: 700,
            margin: 0,
            color: "#5a5a5a",
          }}
        >
          Sta<span style={{ color: "#d94b58" }}>gio</span>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          float: "right",
          right: 40,
        }}
      >
        <p
          style={{
            fontSize: 15,
            fontFamily: "Poppins",
            fontWeight: 700,
            margin: 0,
            marginRight: 20,
          }}
        >
          About Us
        </p>
        <Login status={false} showButton={true}/>
        <Register status={false} showButton={true}/>
      </div>
    </div>
  );
};
export default Navbar;
