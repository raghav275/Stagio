import {
  bookEvent,
  bookingStatus,
  getEvent,
  razorpay,
  setStatus,
  cancel,
} from "@actions/event";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Event, EventStatus, BookingStatus } from "@typings/event";
import { format, parse, formatISO } from "date-fns";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { toast } from "react-toastify";
import { css, cx } from "@emotion/css";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import InfoIcon from "@material-ui/icons/Info";
import ToolTip from "@material-ui/core/Tooltip";
declare global {
  interface Window {
    Razorpay: any;
  }
}
interface Props {
  event: Event;
}
const buttonStyle = css({
  border: "none",
  backgroundColor: "#d94b58",
  borderRadius: 20,
});
function mergeDateandTime(date: string, time: string) {
  return `${date.split("T")[0]}T${time.split("T")[1]}`;
}
const EventPage = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const {
    title,
    description,
    date,
    time,
    price,
    poster,
    banner,
    id,
    users,
    owner,
    status,
  } = props.event;
  const [bookingStat, setBookingStat] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [isBuyOpen, setBuyOpen] = useState(false);
  const [isEndOpen, setEndOpen] = useState(false);
  const [isCancelOpen, setCancelOpen] = useState(false);
  useEffect(() => {
    if (user && owner === user.email) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [user]);
  const bookingStatusFunc = async () => {
    const statusRes = await bookingStatus(id, user?.email);
    setBookingStat(statusRes.status);
  };
  useEffect(() => {
    bookingStatusFunc();
  }, [user]);
  const finalDate = mergeDateandTime(
    formatISO(new Date(date)),
    formatISO(parse(time, "HH:mm", new Date()))
  );
  const showRazorpay = async () => {
    const res = await razorpay(id);
    const options = {
      readonly: {
        email: 1,
      },
      notes: {
        event_id: id,
      },
      key: `${process.env.RZP_KEY}`,
      amount: res.amount,
      currency: "INR",
      name: "Stagio",
      description: `booking for ${title}`,
      image:
        "https://ik.imagekit.io/stagiotest/default_6StvZx4Cp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1645810321356",
      order_id: res.id,
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        setBuyOpen(false);
        toast.dark("Transaction Successful");
        setTimeout(() => {
          router.reload();
        }, 5000);
      },
      prefill: {
        name: user.username,
        email: user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on(
      "payment.failed",
      function (response: {
        error: {
          code: string;
          description: string;
          source: string;
          step: string;
          reason: string;
          metadata: { order_id: string; payment_id: string };
        };
      }) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      }
    );
    rzp1.open();
  };
  const startEvent = async () => {
    const res = await setStatus(id, EventStatus.Started);
    router.push(`/room/${id}`);
  };
  const endEvent = async () => {
    const res = await setStatus(id, EventStatus.Ended);
  };
  const buyTicket = () => {
    if (!session?.user) {
      toast.dark("Please Login To Buy Ticket");
    } else {
      showRazorpay();
    }
  };
  const cancelBooking = async () => {
    try {
      const res = await cancel(id, user?.email);
      toast.dark("Booking cancelled");
    } catch (e) {
      toast.dark(e?.response?.data?.message);
    } finally {
      setCancelOpen(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        backgroundImage:
          banner &&
          `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${banner})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexWrap: "wrap-reverse",
        overflowY: "scroll",
        alignItems: "center",
        minHeight: "calc(100vh - 60px)",
        justifyContent: "center",
        padding: 30,
      }}
    >
      {/* <div
        style={{
          width: "100%",
          backgroundColor: "#000000",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.7) 50%, transparent 100%)",
          padding: 100,
        }}
      ></div> */}
      <div
        style={{
          paddingLeft: 20,
          margin: "auto",
        }}
      >
        {isOwner && (
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: 10,
            }}
          >
            <Link href={{ pathname: "/create-event", query: { id: id } }}>
              <p
                className={css({
                  color: "#d94b58",
                  fontSize: 15,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                })}
              >
                Edit Event
              </p>
            </Link>
          </div>
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: 10,
          }}
        >
          <p style={{ color: "#ffffff", fontSize: 50, fontWeight: 800 }}>
            {title}
          </p>
        </div>
        <div
          style={{
            padding: 10,
            color: "#d94b58",
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          <p>
            {format(new Date(date), "dd MMMM yyyy")}{" "}
            <span style={{ color: "#ffffff" }}>|</span>{" "}
            {format(parse(time, "HH:mm", new Date()), "hh:mm a")}
          </p>
        </div>
        <div style={{ padding: 10, fontSize: 20 }}>
          <p style={{ color: "#ffffff" }}>{description}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
          }}
        >
          {bookingStat === BookingStatus.None && (
            <div
              style={{ display: "flex", alignItems: "center", fontSize: 20 }}
            >
              <p style={{ margin: 0, paddingRight: 10, color: "#ffffff" }}>
                &#8377; {price}
              </p>
            </div>
          )}
          <Button
            className={buttonStyle}
            onClick={() => {
              isOwner ||
              (bookingStat === BookingStatus.Bought &&
                status === EventStatus.Started)
                ? startEvent()
                : bookingStat === BookingStatus.Bought &&
                  status === EventStatus.Idle
                ? toast.dark("Event has not yet started")
                : bookingStat !== BookingStatus.Cancelled
                ? setBuyOpen(true)
                : toast.dark("You've cancelled your booking earlier");
            }}
          >
            {status !== EventStatus.Ended
              ? isOwner
                ? "Start Now"
                : bookingStat === BookingStatus.Bought
                ? status === EventStatus.Started
                  ? "Join Now"
                  : "Already Bought"
                : "Buy Now"
              : "Event Ended"}
          </Button>
          {isOwner && status !== EventStatus.Ended && (
            <Button
              className={cx(
                buttonStyle,
                css({ backgroundColor: "#5a5a5a", marginLeft: 10 })
              )}
              onClick={() => {
                setEndOpen(true);
              }}
            >
              End Event
            </Button>
          )}
          {bookingStat === BookingStatus.Bought && status === EventStatus.Idle && (
            <Button
              className={cx(
                buttonStyle,
                css({
                  backgroundColor: "#5a5a5a",
                  marginLeft: 10,
                  "&:focus": {
                    backgroundColor: "#5a5a5a !important",
                  },
                })
              )}
              onClick={() => {
                setCancelOpen(true);
              }}
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 100,
          margin: "auto",
        })}
      >
        <img
          style={{
            objectFit: "cover",
            width: "280px",
            height: "360px",
            borderRadius: 20,
            boxShadow: "rgb(0 0 0 / 50%) 0px 0px 18px 20px",
          }}
          src={poster}
        ></img>
      </div>
      <Modal
        show={isBuyOpen}
        onHide={() => setBuyOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName={css({
          backgroundColor: "#ffffff",
          borderRadius: 20,
        })}
      >
        <Modal.Header closeButton style={{ border: "none", color: "#d94b58" }}>
          <Modal.Title
            style={{ color: "#000000", marginLeft: 10 }}
            id="contained-modal-title-vcenter"
          >
            Buy Ticket
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={css({
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            })}
          >
            <img
              className={css({
                width: "50%",
                margin: 20,
                borderRadius: "22px",
              })}
              src={poster}
            ></img>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                flex: 1,
                color: "#000000",
                margin: 20,
              })}
            >
              <h3>Summary:</h3>
              <p className={css({ fontSize: 20, marginBottom: 3 })}>
                Sub Total: &nbsp;
                <span className={css({ color: "#d94b58" })}>
                  &#8377;{price}
                </span>
              </p>
              <p className={css({ fontSize: 12 })}>
                Booking Fee{" "}
                <ToolTip
                  title={
                    <>
                      <div>Base Fee : {(price * 0.1).toFixed(2)}</div>
                      <div>GST (18%) : {(price * 0.018).toFixed(2)}</div>
                    </>
                  }
                  arrow
                >
                  <InfoIcon
                    style={{
                      fontSize: 18,
                    }}
                  />
                </ToolTip>
                : &nbsp;
                <span className={css({ color: "#d94b58" })}>
                  &#8377;{(price * 0.118).toFixed(2)}
                </span>
              </p>
              <div
                className={css({
                  border: "1px solid #000000",
                  marginBottom: 5,
                })}
              ></div>
              <h3>
                <span className={css({ color: "#d94b58" })}>Total: </span>
                <span className={css({ color: "#5a5a5a" })}>
                  &#8377;{(price * 1.118).toFixed(2)}
                </span>
              </h3>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
          <div style={{ marginLeft: 10 }}>
            <p
              style={{
                color: "#000000",
                cursor: "pointer",
                marginTop: 15,
                paddingLeft: 10,
                fontSize: 15,
              }}
              onClick={() => {
                setBuyOpen(false);
              }}
            >
              Cancel
            </p>
          </div>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
            onClick={() => buyTicket()}
          >
            Buy Now
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={isEndOpen}
        onHide={() => setEndOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName={css({
          backgroundColor: "#ffffff",
          borderRadius: 20,
        })}
      >
        <Modal.Header closeButton style={{ border: "none", color: "#d94b58" }}>
          <Modal.Title
            style={{ color: "#000000", marginLeft: 10 }}
            id="contained-modal-title-vcenter"
          >
            End Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Do you want to end the event now? You will not be able to start it
            again.
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
          <div style={{ marginLeft: 10 }}>
            <p
              style={{
                color: "#000000",
                cursor: "pointer",
                marginTop: 15,
                paddingLeft: 10,
                fontSize: 15,
              }}
              onClick={() => {
                setEndOpen(false);
              }}
            >
              Cancel
            </p>
          </div>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
            onClick={() => endEvent()}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={isCancelOpen}
        onHide={() => setCancelOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName={css({
          backgroundColor: "#ffffff",
          borderRadius: 20,
        })}
      >
        <Modal.Header closeButton style={{ border: "none", color: "#d94b58" }}>
          <Modal.Title
            style={{ color: "#000000", marginLeft: 10 }}
            id="contained-modal-title-vcenter"
          >
            Cancellation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Are you sure you want to cancel your booking? You won't be able to
            buy this event again
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
          <div style={{ marginLeft: 10 }}>
            <p
              style={{
                color: "#000000",
                cursor: "pointer",
                marginTop: 15,
                paddingLeft: 10,
                fontSize: 15,
              }}
              onClick={() => {
                setCancelOpen(false);
              }}
            >
              Cancel
            </p>
          </div>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
            onClick={() => cancelBooking()}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await getEvent(params?.id as string);

  return {
    props: {
      event: res.event,
    },
  };
};
export default EventPage;
