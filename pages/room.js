import React, { useEffect, useState, useRef } from "react";
import Chatbubble from "../components/chatbubble";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Sidechat from "../components/sidechat";
import VideocamIcon from "@material-ui/icons/Videocam";
import { ChatBubble } from "@material-ui/icons";
import io from "socket.io-client";
import * as webrtc from "wrtc";
import axios from "axios";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const Room = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const videoRef = useRef(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = io(process.env.NEXT_BASE_URL);
    socket.emit("room", "12345");
    socket.on("message", (data) => {
      setMessages((messages) => {
        return [...messages, data.message];
      });
    });
    return () => socket.disconnect();
  }, []);
  const peerConnections = {};
  const config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
      // {
      //   "urls": "turn:TURN_IP?transport=tcp",
      //   "username": "TURN_USERNAME",
      //   "credential": "TURN_CREDENTIALS"
      // }
    ],
  };
  const handleStreamer = () => {
    const socket = io(process.env.NEXT_BASE_URL);
    socket.on("answer", (id, description) => {
      peerConnections[id].setRemoteDescription(description);
    });

    socket.on("watcher", (id) => {
      const peerConnection = new RTCPeerConnection(config);
      peerConnections[id] = peerConnection;

      let stream = videoRef.current.srcObject;
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", id, event.candidate);
        }
      };

      peerConnection
        .createOffer()
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit("offer", id, peerConnection.localDescription);
        });
    });

    socket.on("candidate", (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("disconnectPeer", (id) => {
      peerConnections[id].close();
      delete peerConnections[id];
    });

    window.onunload = window.onbeforeunload = () => {
      socket.close();
    };

    getStream().then(getDevices);

    function getStream() {
      if (window.stream) {
        window.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      return navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(gotStream)
        .catch(handleError);
    }

    function gotStream(stream) {
      window.stream = stream;
      videoRef.current.srcObject = stream;
      console.log(stream);
      console.log(videoRef);
      socket.emit("broadcaster");
    }

    function handleError(error) {
      console.error("Error: ", error);
    }

    function getDevices() {
      return navigator.mediaDevices.enumerateDevices();
    }
  };
  //End of broadcaster

  //Start of watcher

  const handleViewer = () => {
    const socket = io(process.env.NEXT_BASE_URL);
    let peerConnection;
    socket.on("offer", (id, description) => {
      console.log("here");
      peerConnection = new RTCPeerConnection(config);
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit("answer", id, peerConnection.localDescription);
        });
      peerConnection.ontrack = (event) => {
        console.log(event.streams);
        videoRef.current.srcObject = event.streams[0];
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", id, event.candidate);
        }
      };
    });

    socket.on("candidate", (id, candidate) => {
      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error(e));
    });

    socket.on("connect", () => {
      socket.emit("watcher");
    });

    socket.on("broadcaster", () => {
      socket.emit("watcher");
    });

    window.onunload = window.onbeforeunload = () => {
      socket.close();
      peerConnection.close();
    };
  };
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
        <video
          style={{
            width: "100%",
            height: width / 2,
            backgroundSize: "cover",
            borderRadius: 10,
          }}
          ref={videoRef}
          autoPlay
        />
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
          <Button onClick={handleStreamer}>Streamer</Button>
          <Button onClick={handleViewer}>Viewer</Button>
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
          {messages.map((data, i) => {
            return <Chatbubble key={i} name="random" text={data} />;
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
