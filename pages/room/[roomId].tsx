import JitsiComponent from "@components/JitsiComponent";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { checkEvent, qrDetails } from "@actions/event";
import Modal from "react-bootstrap/Modal";
import ErrorPage from "next/error";
import { css } from "@emotion/css";
import Button from "react-bootstrap/Button";
import Image from "next/image";

interface Props {
  errorCode: string;
  userRole: number;
  qrDetails: {
    qr_image: string;
    qr_amount: number;
  };
}
const Room = (props: Props) => {
  const { errorCode, qrDetails } = props;
  const [openModal, setOpenModal] = useState(false);
  console.log(qrDetails, "here");
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>();
  const sendDonation = () => {
    console.log("sent!");
  };
  useEffect(() => {
    if (!router.isReady) return;
    const { roomId } = router.query;
    setRoomId(roomId as string);
    // codes using router.query
  }, [router.isReady]);
  return errorCode ? (
    <ErrorPage statusCode={404} />
  ) : (
    <>
      {roomId && (
        <>
          <div className={css({ position: "absolute", margin: 20 })}>
            <p className={css({ color: "#ffffff" })}>
              Total{" "}
              <span className={css({ color: "#d94b58" })}>Contribution</span>:{" "}
              {`\u20B9 ${qrDetails.qr_amount}`}
            </p>
            <Button
              className={css({
                backgroundColor: "#d94b58",
                border: "none",
                opacity: "0.4",
                "&:hover": {
                  opacity: "1",
                },
              })}
              onClick={() => setOpenModal(true)}
            >
              Contribute To Artist
            </Button>
          </div>
          <JitsiComponent userRole={props.userRole} roomId={roomId as string} />
          <Modal
            show={openModal}
            onHide={() => setOpenModal(false)}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName={css({})}
            contentClassName={css({
              backgroundColor: "#ffffff",
              borderRadius: 20,
            })}
          >
            <Modal.Header
              closeButton
              style={{ border: "none", color: "#d94b58" }}
            >
              <Modal.Title
                style={{ color: "#000000", marginLeft: 10 }}
                id="contained-modal-title-vcenter"
              >
                Contribute To Artist
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className={css({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "auto",
                  marginTop: -70,
                })}
              >
                <Image src={qrDetails.qr_image} width="300px" height="700px" />
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await checkEvent(
    ctx.params?.roomId as string,
    ctx.req.headers.cookie!
  );
  const qr: { qr: { qr_image: string; qr_amount: number } } = await qrDetails(
    ctx.params?.roomId as string
  );
  let code = res.success ? false : 404;
  return {
    props: {
      errorCode: code,
      userRole: res.user_role,
      qrDetails: qr.qr,
    },
  };
};
export default Room;
