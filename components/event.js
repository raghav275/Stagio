import React from "react";
import Button from "react-bootstrap/Button";
const Event = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderBottom: "1px solid #5a5a5a",
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: 800,
            color: "#5a5a5a",
          }}
        >
          June <br /> <span style={{ color: "#d94b58" }}>10</span>
        </p>
      </div>
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: 300,
            color: "#ffffff",
            wordWrap: "normal",
            padding: 30,
          }}
        >
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div>
        <Button
          style={{
            border: "none",
            backgroundColor: "#d94b58",
            borderRadius: 20,
          }}
        >
          Details
        </Button>
      </div>
    </div>
  );
};
export default Event;
