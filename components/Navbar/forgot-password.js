import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/Navbar.module.css";

const Forgot = (props) => {
    const {status} = props;
    const [open, setOpen] = useState(status);
    const [email, setEmail] = useState("");
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      const onSubmit = async(e) => {
        e.preventDefault();
        let user = { email };
        await fetch("https://stagio-backend.herokuapp.com/api/auth/forgot",{
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user)
        })
        setEmail("");
        setOpen(false);
    }

      return(
          <>
            <Modal
      show={open}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={styles.modalStyle}
      contentClassName={styles.body}
    >
    <Modal.Header
      closeButton
      style={{ border: "none", color: "#d94b58" }}
    >
      <Modal.Title
        style={{ color: "#d94b58" }}
        id="contained-modal-title-vcenter"
      >
        Forgot Password
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p style={{ marginBottom: 0, padding: 10, color: "#d94b58" }}>
        Enter Your Email
      </p>
      <input
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
          borderRadius: 60,
          border: "2px solid #d94b58",
          background: "transparent",
          color: "#ffffff",
          outline: "none",
        }}
        type="text"
        name="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
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
        Submit
      </Button>
    </Modal.Footer>
      </Modal>
          </>
      );
};

export default Forgot;