import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/Navbar.module.css";
import Form from "react-bootstrap/Form";
const mainStyle = {
  width: "100%",
  height: "60px",
  backgroundColor: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  marginBottom: "60px",
};
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div style={mainStyle}>
      <div style={{ position: "absolute", left: 40 }}>
        <p
          style={{
            fontSize: 20,
            fontFamily: "Poppins",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Sta<span style={{ color: "#007bff" }}>gio</span>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          float: "right",
          right: 40,
        }}
      >
        <p
          style={{
            fontSize: 15,
            fontFamily: "Poppins",
            fontWeight: 700,
            margin: 0,
            marginRight: 20,
          }}
        >
          About Us
        </p>
        <Button
          style={{
            borderRadius: "50px",
            borderWidth: 2,
            fontFamily: "Poppins-Medium",
          }}
          onClick={handleOpen}
          variant="outline-primary"
        >
          Sign in
        </Button>
        <Modal
          show={open}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName={styles.modalStyle}
        >
          <Modal.Header closeButton style={{ border: "none" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              Sign In
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <h5>Enter Your Phone Number to Sign In</h5>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Phone Number"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
            <Button>Sign In</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default Navbar;
