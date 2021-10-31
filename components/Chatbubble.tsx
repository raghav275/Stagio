import React, { useState } from "react";

interface Props {
  text: string;
  name: string;
}
const Chatbubble = (props: Props) => {
  const { text, name } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "fit-content",
        padding: 10,
      }}
    >
      <div
        style={{
          margin: 5,
          width: 25,
          height: 25,
          borderRadius: 60,
          overflow: "hidden",
        }}
      >
        <img
          style={{ objectFit: "cover", width: "25px", height: "25px" }}
          src="https://dilliwaliblog.files.wordpress.com/2020/08/i0m27jp8_400x400.jpg"
        ></img>
      </div>
      <div style={{ margin: 5, marginTop: 0 }}>
        <p style={{ marginBottom: 0, color: "#ffffff", fontWeight: 800 }}>
          {name}
        </p>
        <p
          style={{
            marginBottom: 0,
            color: "#ffffff",
            fontWeight: 400,
            fontSize: 15,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default Chatbubble;
