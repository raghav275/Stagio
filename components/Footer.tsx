import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
        paddingTop: 60,
        paddingBottom: 60,
        marginLeft: 65,
        marginRight: 65,
        marginTop: 30,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p
          style={{
            fontSize: 50,
            fontFamily: "Poppins",
            fontWeight: 700,
            margin: 0,
            color: "#5a5a5a",
          }}
        >
          Sta<span style={{ color: "#d94b58" }}>gio</span>
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <InstagramIcon style={{ color: "#5a5a5a" }} />
          <FacebookIcon style={{ color: "#5a5a5a" }} />
          <TwitterIcon style={{ color: "#5a5a5a" }} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#ffffff",
          width: "30%",
        }}
      >
        <p>Privacy Policy</p>
        <p>Terms and Conditions</p>
        <p>FAQs</p>
      </div>
    </div>
  );
};
export default Footer;
