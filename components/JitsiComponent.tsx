import { css } from "@emotion/css";
import React, { Component, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}
interface Props {
  roomId: string;
  userRole: number;
}
let domain = "meet.stagiolive.com";
let api: any = {};
const JitsiComponent = (props: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const { roomId } = props;
  const [isFinished, setIsFinished] = useState(false);
  const handleClose = () => {
    router.push(`/event-details/${roomId}`);
  };
  const handleLeaving = () => {
    router.push(`/event-details/${roomId}`);
  };

  // const handleParticipantLeft = async (participant: any) => {
  //   console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
  // };

  // const handleParticipantJoined = async (participant: any) => {
  //   console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
  // };

  // const handleMuteStatus = (audio: any) => {
  //   console.log("handleMuteStatus", audio); // { muted: true }
  // };

  // const handleVideoStatus = (video: any) => {
  //   console.log("handleVideoStatus", video); // { muted: true }
  // };

  // const getParticipants = () => {
  //   console.log("lol");
  // };
  const [room, setRoom] = useState({
    room: roomId,
    user: {
      name: user?.username,
    },
    isAudioMuted: false,
    isVideoMuted: false,
  });
  // useEffect(() => {
  //   if (session) {

  //   }
  // }, );
  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      startMeet(session?.user.username);
    }
  }, []);
  const startMeet = (username: string) => {
    const options = {
      roomName: room.room,

      configOverwrite: {
        subject: "Online",
        prejoinPageEnabled: false,
        disableSimulcast: false,
        enableClosePage: false,
      },
      interfaceConfigOverwrite: {
        // overwrite interface properties
        TOOLBAR_BUTTONS: [
          "microphone",
          "mute-everyone",
          "camera",
          "closedcaptions",
          // "desktop",
          "fullscreen",
          // "fodeviceselection",
          "hangup",
          "mute-everyone",
          "mute-video-everyone",
          // 'profile',
          // 'info',
          "chat",
          //   "recording",
          // 'livestreaming',
          // 'etherpad',
          // 'sharedvideo',
          props.userRole === 0 ? "" : "settings",
          // 'raisehand',
          "videoquality",
          "filmstrip",
          "invite",
          // 'feedback',
          // 'stats',
          // 'shortcuts',
          "tileview",
          "videobackgroundblur",
          "download",
          // 'help'
        ],
        filmStripOnly: false,
        CLOSE_PAGE_GUEST_HINT: false,
        ENABLE_FEEDBACK_ANIMATION: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
      },

      parentNode: document.querySelector("#jitsi-iframe"),
      userInfo: {
        displayName: username,
      },
    };
    api = new window.JitsiMeetExternalAPI(domain, options);
    api.addEventListeners({
      readyToClose: handleClose,
      videoConferenceLeft: handleLeaving,
      // participantLeft: handleParticipantLeft,
      // participantJoined: handleParticipantJoined,
      // audioMuteStatusChanged: handleMuteStatus,
      // videoMuteStatusChanged: handleVideoStatus,
    });
    // api.execute()
    // api.executeCommand("displayName", `${room.user.name}`);
  };
  return (
    <div
      className={css({
        display: "flex",
        width: "100%",
        height: "calc(100vh - 60px)",
      })}
    >
      <div
        className={css({
          width: "100%",
          height: "100%",
        })}
        id="jitsi-iframe"
      ></div>
    </div>
  );
};
export default JitsiComponent;
