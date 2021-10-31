import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
declare global {
  interface Window {
    Razorpay: any;
  }
}
const EventPage = () => {
  const showRazorpay = () => {
    var options = {
      key: "rzp_test_MlcYP95WX6DCWy",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_I4w8sW5E3j85gI", 
      handler: function (response: {
        razorpay_payment_id: any;
        razorpay_order_id: any;
        razorpay_signature: any;
      }) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
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
        height: "100vh",
        backgroundImage:
          "url(https://www.live-now.com/image/1920/1080/c627aebb-20d4-4872-b1d3-3e7dfb5d22ec.jpg?v=20210429120129)",
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
            Suno Bey presents LoL from Home
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
            June 10 <span style={{ color: "#ffffff" }}>|</span> 6:00 PM
          </p>
        </div>
        <div style={{ padding: 10, fontSize: 20 }}>
          <p style={{ color: "#ffffff" }}>
            Lorem ipsum dolor sit amet,
            <br /> efficitur eleifend. Fusce interdum <br />
            mollis velit fringilla facilisis.
            <br /> Lorem ipsum dolor sit amet,
            <br /> efficitur eleifend. Fusce interdum <br />
            mollis velit fringilla facilisis.{" "}
          </p>
        </div>
        <div style={{ padding: 10 }}>
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
            Buy Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EventPage;
