import JitsiComponent from "@components/JitsiComponent";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Room = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>();
  useEffect(() => {
    if (!router.isReady) return;
    const { roomId } = router.query;
    setRoomId(roomId as string);
    // codes using router.query
  }, [router.isReady]);
  return <>{roomId && <JitsiComponent roomId={roomId as string} />}</>;
};
export default Room;
