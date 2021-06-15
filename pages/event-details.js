import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const EventPage = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundImage:
          "url(https://www.live-now.com/image/1920/1080/c627aebb-20d4-4872-b1d3-3e7dfb5d22ec.jpg?v=20210429120129)",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#000000",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.7) 50%, transparent 100%)",
          padding: 100,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: "20vh",
          paddingLeft: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: 10,
          }}
        >
          <p style={{ color: "#ffffff", fontSize: 50, fontWeight: 800 }}>
            Suno Bey presents LoL from Home
          </p>
        </div>
        <div
          style={{
            padding: 10,
            color: "#d94b58",
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          <p>
            June 10 <span style={{ color: "#ffffff" }}>|</span> 6:00 PM
          </p>
        </div>
        <div style={{ padding: 10, fontSize: 20 }}>
          <p style={{ color: "#ffffff" }}>
            Lorem ipsum dolor sit amet,
            <br /> efficitur eleifend. Fusce interdum <br />
            mollis velit fringilla facilisis.
            <br /> Lorem ipsum dolor sit amet,
            <br /> efficitur eleifend. Fusce interdum <br />
            mollis velit fringilla facilisis.{" "}
          </p>
        </div>
        <div style={{ padding: 10 }}>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
          >
            Buy Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EventPage;
