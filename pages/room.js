import React, { useEffect, useState } from "react";
import Chatbubble from "../components/chatbubble";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Sidechat from "../components/sidechat";
import VideocamIcon from "@material-ui/icons/Videocam";
import { ChatBubble } from "@material-ui/icons";
const Room = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#181818",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 3,
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "100%",
            height: width / 2,
            backgroundSize: "cover",
            borderRadius: 10,
          }}
          src="https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg
        "
        ></img>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            width: "fit-content",
            backgroundColor: "#d94b58",
            borderTopLeftRadius: 13,
            borderBottomRightRadius: 13,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            margin: 10,
            paddingRight: 10,
            paddingLeft: 10,
            paddingTop: 5,
            paddingBottom: 5,
            marginTop: (height - width / 2) / 2,
          }}
        >
          <p style={{ color: "#ffffff", marginBottom: 0 }}>Live</p>
          <VideocamIcon style={{ color: "#ffffff" }} />
        </div>
        <div style={{ margin: 10, color: "#ffffff" }}>
          <p style={{ fontWeight: 800, fontSize: 25 }}>
            Create A Conscious Morning Ritual
          </p>
          <p style={{ fontWeight: 500, fontSize: 15 }}>With Jason McRice</p>
          <p style={{ fontWeight: 300, fontSize: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
          >
            Donate to Jason
          </Button>
        </div>
        <div
          style={{
            marginTop: 30,
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1.0) 70%, transparent 100%)",
            overflowY: "scroll",
            marginBottom: 10,
          }}
        >
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((i) => {
            return <Chatbubble key={i} name="Random" text="hello" />;
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            marginBottom: (height - width / 2) / 2,
          }}
        >
          <input
            style={{
              width: "90%",
              padding: 10,
              borderRadius: 60,
              border: "2px solid #d94b58",
              background: "transparent",
              color: "#ffffff",
              outline: "none",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRight: "none",
            }}
            placeholder="Comment"
          ></input>
          <button
            style={{
              padding: 10,
              border: "2px solid #d94b58",
              background: "transparent",
              borderTopRightRadius: 60,
              borderBottomRightRadius: 60,
              borderLeftStyle: "none",
              outline: "none",
              color: "#ffffff",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default Room;
