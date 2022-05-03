import React from "react";

const ComingSoon = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        alignContent: "center",
        justifyContent: "center",
        height: "calc(100vh - 60px)",
        padding: 30,
        backgroundSize: "cover",
        background:
          "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(https://www.kolpaper.com/wp-content/uploads/2020/12/Dermot-Kennedy-Concert-Wallpaper.jpeg)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          color: "#ffffff",
        }}
      >
        <p className="coming-soon">
          A 100% COMMISSION FREE PLATFORM FOR ARTISTS TO HOST EVENTS
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
          <span className="email" style={{ color: "#d94b58" }}>
            stagiolive@gmail.com
          </span>{" "}
          and join hundreds of other artists
        </p>
      </div>
    </div>
  );
};
export default ComingSoon;
