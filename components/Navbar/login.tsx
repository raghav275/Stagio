import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/Navbar.module.css";
import Register from "./register";
import Forgot from "./forgot-password";
interface Props {
  status: boolean;
  showButton: boolean;
}
const Login = (props: Props) => {
  const { status, showButton } = props;
  const [open, setOpen] = useState(status);
  const [selected, setSelected] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOpen = () => {
    setOpen(true);
    setSelected("Login");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let user = { email, password };
    await fetch("https://stagio-backend.herokuapp.com/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    setEmail("");
    setPassword("");
    setOpen(false);
  };

  return (
    <>
      {showButton && (
        <Button
          className={styles.sign}
          style={{
            borderRadius: "50px",
            borderWidth: 2,
            fontFamily: "Poppins-Medium",
            borderColor: "#d94b58",
            color: "#ffffff",
            marginRight: 20,
            fontSize: 14,
          }}
          onClick={handleOpen}
          variant="outline-primary"
        >
          Sign in
        </Button>
      )}
      {selected === "Login" && (
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
              Sign In
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Here"
            ></input>
            <p style={{ marginBottom: 0, padding: 10, color: "#d94b58" }}>
              Enter Your Password
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
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Here"
            ></input>
            <p
              style={{
                color: "#ffffff",
                cursor: "pointer",
                paddingLeft: 10,
                fontSize: 15,
              }}
              onClick={() => {
                setSelected("Forgot Password");
              }}
            >
              Forgot Password
            </p>
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
              Sign In
            </Button>
            <div style={{ marginLeft: 10 }}>
              <p
                style={{
                  color: "#d94b58",
                  cursor: "pointer",
                  marginTop: 15,
                  paddingLeft: 10,
                  fontSize: 15,
                }}
                onClick={() => {
                  setSelected("New User");
                }}
              >
                New User?
              </p>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {selected === "New User" && <Register status={true} showButton={false} />}
      {selected === "Forgot Password" && <Forgot status={true} />}
    </>
  );
};

export default Login;