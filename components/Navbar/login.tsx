import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/Navbar.module.css";
import Register from "./register";
import Forgot from "./forgot-password";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { loading } from "slices/loadingSlice";
import { useCookies } from "react-cookie";
import { login } from "@actions/auth";
import { useSession, signIn, SignInResponse } from "next-auth/react";
import { toast } from "react-toastify";
import { css } from "@emotion/css";
import { RedirectableProviderType } from "next-auth/providers";
interface Props {
  status: boolean;
  showButton: boolean;
}
const Login = (props: Props) => {
  const { data: session, status: lol } = useSession();
  const { status, showButton } = props;
  const [open, setOpen] = useState(status);
  const [selected, setSelected] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["user"]);

  const [loadingState, setLoadingState] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setSelected("Login");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    setLoadingState(true);
    e.preventDefault();
    // const res = await login(email, password);
    // setCookie("user", "Bearer " + res.token, {
    //   path: "/",
    //   maxAge: Date.now() + 10 * (60 * 1000), // Expires after 1hr
    //   sameSite: true,
    // });
    const response = await login(email, password);
    const res = await signIn<RedirectableProviderType>("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error !== null) toast.dark("Invalid Credentials");
    else {
      toast.dark("Logged In Successfully");
    }
    setEmail("");
    setPassword("");
    setOpen(false);
    setLoadingState(false);
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
            marginRight: 10,
            fontSize: 14,
          }}
          onClick={handleOpen}
          variant="outline-primary"
        >
          Log in
        </Button>
      )}
      {selected === "Login" && (
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
          <Modal.Header
            closeButton
            style={{ border: "none", color: "#DE636F" }}
          >
            <Modal.Title
              style={{ color: "#DE636F" }}
              id="contained-modal-title-vcenter"
            >
              Sign In
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
            <p style={{ marginBottom: 0, padding: 10, color: "#DE636F" }}>
              Enter Your Password
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
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Here"
            ></input>
            <p
              className={css({
                color: "#ffffff",
                cursor: "pointer",
                paddingLeft: 10,
                fontSize: 15,
                "&:hover": {
                  textDecoration: "underline",
                },
              })}
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
              Sign In{" "}
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
