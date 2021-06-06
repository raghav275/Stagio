import React, { useState, useEffect } from "react";
import Chatbubble from "./chatbubble";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const Sidechat = ({ open, setOpen }) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);
  const [arrow, setArrow] = useState(">");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", left: "15px" }}>
        <Button
          onClick={() => {
            setArrow(arrow === ">" ? "<" : ">");
            setOpen(!open);
          }}
          style={{
            backgroundColor: "#19182b",
            borderColor: "#333055",
            borderRadius: 40,
          }}
        >
          {arrow}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          backgroundColor: "#333055",
          borderTopLeftRadius: "26px",
          borderBottomLeftRadius: "26px",
        }}
      >
        <div
          style={{
            backgroundColor: "#19182b",
            height: "80px",
            borderTopLeftRadius: "26px",
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: "#19182b",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3 style={{ margin: 0, color: "#ffffff" }}>
            Live <span style={{ color: "#007bff" }}>Chat</span>
          </h3>
        </div>
        <div
          style={{
            padding: 20,
            overflowY: "scroll",
            maxHeight: height - 170,
          }}
        >
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((i) => {
            return <Chatbubble key={i} name="Random" text="hello" />;
          })}
        </div>
        <div
          style={{
            padding: 10,
            width: "90%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <Form.Group>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Enter Your Message"
              style={{
                backgroundColor: "#19182b",
                borderRadius: 40,
                borderColor: "#584A96",
              }}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};
export default Sidechat;
