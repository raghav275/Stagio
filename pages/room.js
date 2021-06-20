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
    const socket = io(process.env.BASE_URL);
    socket.emit("room", "12345");
    socket.on("message", (data) => {
      setMessages((messages) => {
        return [...messages, data.message];
      });
    });

    return () => socket.disconnect();
  }, []);
  const handleStreamer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
      const peer = createPeer();
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    } catch (err) {
      console.log(err);
    }
  };

  const createPeer = () => {
    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocols.org",
        },
      ],
    });
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  };

  const handleNegotiationNeededEvent = async (peer) => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };
    const { data } = await axios.post(
      process.env.BASE_URL + "api/event/broadcast",
      payload
    );
    const desc = new webrtc.RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  };

  const handleViewer = () => {
    const peer = createPeerV();
    peer.addTransceiver("video", { direction: "recvonly" });
  };

  const createPeerV = () => {
    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocols.org",
        },
      ],
    });
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEventV(peer);
    return peer;
  };
  const handleNegotiationNeededEventV = async (peer) => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };
    const { data } = await axios.post(
      process.env.BASE_URL + "api/event/consumer",
      payload
    );
    // console.log(data);
    const desc = new webrtc.RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  };

  const handleTrackEvent = (e) => {
    videoRef.current.srcObject = e.streams[0];
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

// <div
//   style={{
//     display: "flex",
//     width: "100%",
//     flexDirection: "row",
//     backgroundColor: "#181818",
//   }}
// >
//   <div
//     style={{
//       display: "flex",
//       flex: 3,
//       alignItems: "center",
//     }}
//   >
//     <Button onClick={handleStreamer}>Streamer</Button>
//     <Button onClick={handleViewer}>Viewer</Button>
//     <video
//       style={{
//         width: "100%",
//         height: width / 2,
//         borderRadius: 10,
//         background: "green",
//       }}
//       ref={videoRef}
//     ></video>
//   </div>
//   <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//     <div
//       style={{
//         display: "flex",
//         width: "fit-content",
//         backgroundColor: "#d94b58",
//         borderTopLeftRadius: 13,
//         borderBottomRightRadius: 13,
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "row",
//         margin: 10,
//         paddingRight: 10,
//         paddingLeft: 10,
//         paddingTop: 5,
//         paddingBottom: 5,
//         marginTop: (height - width / 2) / 2,
//       }}
//     >
//       <Button onClick={handleStreamer}>Streamer</Button>
//       <Button onClick={handleViewer}>Viewer</Button>
//       <p style={{ color: "#ffffff", marginBottom: 0 }}>Live</p>
//       <VideocamIcon style={{ color: "#ffffff" }} />
//     </div>
//     <div style={{ margin: 10, color: "#ffffff" }}>
//       <p style={{ fontWeight: 800, fontSize: 25 }}>
//         Create A Conscious Morning Ritual
//       </p>
//       <p style={{ fontWeight: 500, fontSize: 15 }}>With Jason McRice</p>
//       <p style={{ fontWeight: 300, fontSize: 10 }}>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
//         dolor sit amet, consectetur adipiscing elit.
//       </p>
//       <Button
//         style={{
//           border: "none",
//           backgroundColor: "#d94b58",
//           borderRadius: 20,
//         }}
//       >
//         Donate to Jason
//       </Button>
//     </div>
//     <div
//       style={{
//         marginTop: 30,
//         WebkitMaskImage:
//           "linear-gradient(to top, rgba(0, 0, 0, 1.0) 70%, transparent 100%)",
//         overflowY: "scroll",
//         marginBottom: 10,
//       }}
//     >
//       {messages.map((data, i) => {
//         return <Chatbubble key={i} name="random" text={data} />;
//       })}
//     </div>
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         marginLeft: 10,
//         marginBottom: (height - width / 2) / 2,
//       }}
//     >
//       <input
//         style={{
//           width: "90%",
//           padding: 10,
//           borderRadius: 60,
//           border: "2px solid #d94b58",
//           background: "transparent",
//           color: "#ffffff",
//           outline: "none",
//           borderTopRightRadius: 0,
//           borderBottomRightRadius: 0,
//           borderRight: "none",
//         }}
//         placeholder="Comment"
//       ></input>
//       <button
//         style={{
//           padding: 10,
//           border: "2px solid #d94b58",
//           background: "transparent",
//           borderTopRightRadius: 60,
//           borderBottomRightRadius: 60,
//           borderLeftStyle: "none",
//           outline: "none",
//           color: "#ffffff",
//         }}
//       >
//         Send
//       </button>
//     </div>
//   </div>
// </div>
