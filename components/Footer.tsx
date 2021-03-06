import React, { useState } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Modal from "react-bootstrap/Modal";
import { useStore } from "react-redux";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";
import { css } from "@emotion/css";
import Link from "next/link";

const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  const [flag, setFlag] = useState(0);
  return (
    <div
      className="footer"
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "60px 30px",
        margin: "30px 65px 0px",
        alignItems: "center",
      }}
    >
      <div>
        <div
          className={css({
            margin: 10,
            marginBottom: 30,
          })}
        >
          <p
            style={{
              fontSize: 50,
              fontFamily: "Poppins",
              fontWeight: 700,
              margin: 0,
              color: "#5a5a5a",
            }}
          >
            Sta<span style={{ color: "#d94b58" }}>gio</span>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <a href="https://www.instagram.com/stagiolive">
              <InstagramIcon
                className={css({ color: "#5a5a5a", cursor: "pointer" })}
              />
            </a>
            <FacebookIcon style={{ color: "#5a5a5a" }} />
            <a href="https://www.twitter.com/stagiolive">
              <TwitterIcon style={{ color: "#5a5a5a" }} />
            </a>
          </div>
        </div>
      </div>
      <div
        className={css({
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        })}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            color: "#ffffff",
            margin: "auto",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link href={"/about"}>
            <p
              className={css({
                width: "max-content",
                margin: 10,
                wordWrap: "break-word",
                cursor: "pointer",
              })}
            >
              About Us
            </p>
          </Link>
          <p
            onClick={() => {
              setOpen(true);
              setFlag(1);
            }}
            className={css({
              width: "max-content",
              margin: 10,
              cursor: "pointer",
            })}
          >
            Privacy Policy
          </p>
          <p
            className={css({
              width: "max-content",
              margin: 10,
              wordWrap: "break-word",
              cursor: "pointer",
            })}
            onClick={() => {
              setOpen(true);
              setFlag(2);
            }}
          >
            Terms and Conditions
          </p>
        </div>
      </div>
      <Modal
        show={isOpen}
        onHide={() => setOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName={css({})}
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
            {flag === 1 ? "Privacy Policy" : "Terms and Conditions"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={css({
              display: "flex",
              overflow: "auto",
              maxHeight: "70vh",
              padding: 15,
            })}
          >
            {flag === 1 ? <PrivacyPolicy /> : <TermsConditions />}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Footer;
