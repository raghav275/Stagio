import React from "react";
const Neon = (props) => {
  const text = props.text;
  const size = props.size;
  return (
    <div
      className="logo"
      style={{
        margin: "auto",
        userSelect: "none",
      }}
    >
      <b
        style={{
          fontFamily: "Vibur",
          fontSize: size,
          color: "#fee",
          textShadow:
            "0 -40px 100px, 0 0 2px, 0 0 1em #ff4444, 0 0 0.5em #ff4444, 0 0 0.1em #ff4444, 0 10px 3px #000",
        }}
      >
        {text}
      </b>
    </div>
  );
};
export default Neon;
