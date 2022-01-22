import { getEvent, razorpay } from "@actions/event";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Event } from "@typings/event";
import { format, parse } from "date-fns";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

declare global {
  interface Window {
    Razorpay: any;
  }
}
interface Props {
  event: Event;
}
const EventPage = (props: Props) => {
  // console.log(props.event);
  const { data: session, status } = useSession();
  const user = session?.user
  const { title, description, date, time, price, poster, banner ,id} = props.event;
  const showRazorpay =async () => {
    const res = await razorpay(id);
    const options = {
      key: `${process.env.RZP_KEY}`,
      amount:res.amount,
      currency: "INR",
      name: "Stagio",
      description: `booking for ${title}`,
      image: "https://example.com/your_logo",
      order_id: res.id,
      handler: function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
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
          code: any;
          description: any;
          source: any;
          step: any;
          reason: any;
          metadata: { order_id: any; payment_id: any };
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
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 60px)",
        backgroundImage: `url(${banner})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#000000",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.7) 50%, transparent 100%)",
          padding: 100,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: "20vh",
          paddingLeft: 20,
        }}
      >
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
          <div style={{ display: "flex", alignItems: "center", fontSize: 20 }}>
            <p style={{ margin: 0, paddingRight: 10, color: "#ffffff" }}>
              &#8377; {price}
            </p>
          </div>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
            onClick={() => {
              showRazorpay();
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const event = await getEvent(params?.id as string);
  return {
    props: {
      event: event.event,
    },
  };
};
export default EventPage;
