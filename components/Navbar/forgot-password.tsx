import { forgot } from "@actions/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import styles from "../../styles/Navbar.module.css";
import { css } from "@emotion/css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { loading } from "slices/loadingSlice";
import { toast } from "react-toastify";

interface Props {
  status: boolean;
}
const Forgot = (props: Props) => {
  const { status } = props;
  const [open, setOpen] = useState(status);
  const [email, setEmail] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    try {
      setLoadingState(true);
      e.preventDefault();
      let user = { email };
      const res = await forgot(email);
      setEmail("");
      setOpen(false);
      toast.dark("Reset Link Sent");
    } catch (e) {
      const err = e?.response?.data?.message;
      toast.dark(err);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName={css({
          backgroundColor: "#181818",
        })}
      >
        <Modal.Header closeButton style={{ border: "none", color: "#DE636F" }}>
          <Modal.Title
            style={{ color: "#DE636F" }}
            id="contained-modal-title-vcenter"
          >
            Forgot Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ marginBottom: 0, padding: 10, color: "#DE636F" }}>
            Enter Your Email
          </p>
          <input
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
              borderRadius: 60,
              border: "2px solid #DE636F",
              background: "transparent",
              color: "#ffffff",
              outline: "none",
            }}
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Here"
          ></input>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
            onClick={onSubmit}
          >
            Submit{" "}
            {loadingState && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Forgot;
