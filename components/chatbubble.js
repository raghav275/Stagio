import React, { useState } from "react";

const Chatbubble = (props) => {
  const text = props.text;
  const name = props.name;
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#19182b",
        borderRadius: "10px",
        padding: 10,
        margin: 5,
        width: "fit-content",
      }}
    >
      <p style={{ color: "#ffffff" }}>
        <span style={{ color: "#007bff" }}>{name}</span>:{text}
      </p>
    </div>
  );
};

export default Chatbubble;
