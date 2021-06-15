import React, { useState, useEffect } from "react";

const ComingSoon = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundImage:
          "url(https://www.kolpaper.com/wp-content/uploads/2020/12/Dermot-Kennedy-Concert-Wallpaper.jpeg)",
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
      <div className="footerContainer">
        <p className="coming-soon">
          Coming Soon
        </p>
      </div>
      <div className="title">
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
      </div>
      <div
        className="container"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          left: 0,
          color: "#ffffff",
          paddingLeft: 30,
        }}
      >
        <p className="head">
          A 100% commission free platform for artists to host events
        </p>
        <p className="description">
          A platform curated to narrow the gap between artists and their fans by
          hosting live shows giving you the front row experience at your home.
        </p>
        <p className="description">
          On Stagio, artists perform live, online shows from their laptop that
          are never recorded or archived. That's right! Every Stagio show is a
          once-in-a-lifetime experience that's not to be missed.
        </p>
        <p className="description">
          Stagio allows both fans and artists to be part of the show. Fans are
          encouraged to ask the artist questions, request songs, and even chat
          with other fans during the show.
        </p>
        <p className="description">
          Stagio enables fans to support artists. Whether you're helping an
          artist finance their next album or contributing to the performer's
          favorite charity, Stagio artists actually get paid for their time.
        </p>
        <p className="description">
          Contact us at{" "}
          <span className="email" style={{ color: "#d94b58" }}>stagiodotin@gmail.com</span> to
          join hundreds of other artists
        </p>
      </div>
    </div>
  );
};
export default ComingSoon;
