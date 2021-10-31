import React, { useState } from "react";
import Login from "./Navbar/login";
import Register from "./Navbar/register";
import Link from "next/link";
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
  const handleOpen = (str: string) => {
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
        <Link href={"/create-event"}>
          <div
            style={{
              fontSize: 15,
              fontFamily: "Poppins",
              fontWeight: 700,
              margin: 0,
              marginRight: 20,
              color: "#ffffff",
              borderBottom: "1px solid #d94b58",
              cursor: "pointer",
            }}
          >
            + Create
          </div>
        </Link>
        <Login status={false} showButton={true} />
        <Register status={false} showButton={true} />
      </div>
    </div>
  );
};
export default Navbar;
