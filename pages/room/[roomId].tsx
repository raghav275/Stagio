import JitsiComponent from "@components/JitsiComponent";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { checkEvent } from "@actions/event";
import ErrorPage from "next/error";

interface Props {
  errorCode: string;
}
const Room = (props: Props) => {
  const { errorCode } = props;
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>();
  useEffect(() => {
    if (!router.isReady) return;
    const { roomId } = router.query;
    setRoomId(roomId as string);
    // codes using router.query
  }, [router.isReady]);
  return errorCode ? (
    <ErrorPage statusCode={404} />
  ) : (
    <>{roomId && <JitsiComponent roomId={roomId as string} />}</>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await checkEvent(
    ctx.params?.roomId as string,
    ctx.req.headers.cookie!
  );
  let code = res.success ? false : 404;
  return {
    props: {
      errorCode: code,
    },
  };
};
export default Room;
