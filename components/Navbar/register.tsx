import { register } from "@actions/auth";
import { ContactSupport } from "@material-ui/icons";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/Navbar.module.css";
import { css, cx } from "@emotion/css";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Spinner from "react-bootstrap/Spinner";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { loading } from "slices/loadingSlice";
interface Props {
  status: boolean;
  showButton: boolean;
}
const Register = (props: Props) => {
  const inputBoxStyle = css({
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 60,
    border: "2px solid #DE636F",
    background: "transparent",
    color: "#ffffff",
    outline: "none",
  });
  const inputBoxHeading = css({
    marginBottom: 0,
    padding: 10,
    color: "#DE636F",
  });
  const { status, showButton } = props;
  const [open, setOpen] = useState(status);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [loadingState, setLoadingState] = useState(false);
  const onSubmit = async (e: { preventDefault: () => void }) => {
    if (confirmPass !== password) {
      toast.dark("Passwords Don't Match");
      return;
    }
    console.log(username.split(" "));
    let usernameValidation = username;
    if (usernameValidation.split(" ").length > 1) {
      toast.dark("Username cannot contain spaces");
      return;
    }
    e.preventDefault();
    setLoadingState(true);
    try {
      const res = await register(
        name,
        username.trim(),
        email.toLocaleLowerCase(),
        password
      );
      toast.dark("Registered Succesfully");
      signIn("credentials", {
        redirect: false,
        email: email.toLocaleLowerCase(),
        password,
      });
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setOpen(false);
    } catch (err: any) {
      const error = err?.response?.data?.error.split(",");
      error.map((e: string) => toast.dark(e));
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <>
      {showButton && (
        <Button
          className={cx(styles.sign)}
          style={{
            borderRadius: "50px",
            borderWidth: 2,
            fontFamily: "Poppins-Medium",
            borderColor: "#d94b58",
            color: "#ffffff",
            fontSize: 14,
          }}
          onClick={handleOpen}
          variant="outline-primary"
        >
          Sign up
        </Button>
      )}
      <Modal
        show={open}
        onHide={handleClose}
        size="lg"
        aria-labelledby="container-modal-title-vcenter"
        centered
        contentClassName={css({
          backgroundColor: "#181818",
        })}
      >
        <Modal.Header closeButton style={{ border: "none", color: "#DE636F" }}>
          <Modal.Title
            style={{ color: "#DE636F" }}
            id="contained-modal-title-vcenter "
          >
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={inputBoxHeading}>Enter Your Full Name</p>
          <input
            className={inputBoxStyle}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Here"
          ></input>
          <p className={inputBoxHeading}>Enter Your Username</p>
          <input
            className={inputBoxStyle}
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Here"
          ></input>
          <p className={inputBoxHeading}>Enter Your Email</p>
          <input
            className={inputBoxStyle}
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Here"
          ></input>
          <p className={inputBoxHeading}>Enter Your Password</p>
          <input
            className={inputBoxStyle}
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Here"
          ></input>
          <p className={inputBoxHeading}>Confirm Your Password</p>
          <input
            className={inputBoxStyle}
            type="password"
            name="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Enter Here"
          ></input>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
          <Button
            className={css({
              border: "none",
              backgroundColor: "#D94B58",
              borderRadius: 20,
            })}
            onClick={onSubmit}
          >
            Register{" "}
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

export default Register;
