import React, { useState, useEffect } from "react";

const ComingSoon = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);
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
      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <p
          className="coming-soon"
          style={{
            color: "#a5a5a5d1",
            fontSize: 100,
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          Coming Soon
        </p>
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, margin: 30 }}>
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
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          width: "50%",
          left: 0,
          top: height / 4,
          color: "#ffffff",
          paddingLeft: 30,
        }}
      >
        <p
          style={{
            fontSize: 30,
            color: "#d94b58",
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          A 100% commission free platform for artists to host events
        </p>
        <p>
          A platform curated to narrow the gap between artists and their fans by
          hosting live shows giving you the front row experience at your home.
        </p>
        <p>
          On Stagio, artists perform live, online shows from their laptop that
          are never recorded or archived. That's right! Every Stagio show is a
          once-in-a-lifetime experience that's not to be missed.
        </p>
        <p>
          Stagio allows both fans and artists to be part of the show. Fans are
          encouraged to ask the artist questions, request songs, and even chat
          with other fans during the show.
        </p>
        <p>
          Stagio enables fans to support artists. Whether you're helping an
          artist finance their next album or contributing to the performer's
          favorite charity, Stagio artists actually get paid for their time.
        </p>
        <p>
          Contact us at{" "}
          <span style={{ color: "#d94b58" }}>stagiodotin@gmail.com</span> to
          join hundreds of other artists
        </p>
      </div>
    </div>
  );
};
export default ComingSoon;
