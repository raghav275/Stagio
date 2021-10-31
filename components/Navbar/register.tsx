import { ContactSupport } from "@material-ui/icons";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/Navbar.module.css";

interface Props{
    status : boolean;
    showButton:boolean;
}
const Register = (props: Props) => {
    const { status, showButton } = props;
    const [open, setOpen] = useState(status);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let user = { username, email, password };
        await fetch("https://stagio-backend.herokuapp.com/api/auth/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        setUsername("");
        setEmail("");
        setPassword("");
        setOpen(false);
    }

    return (
        <>
            {showButton &&
                <Button
                    className={styles.sign}
                    style={{
                        borderRadius: "50px",
                        borderWidth: 2,
                        fontFamily: "Poppins-Medium",
                        borderColor: "#d94b58",
                        color: "#ffffff",
                        marginRight: 20,
                        fontSize: 14
                    }}
                    onClick={handleOpen}
                    variant="outline-primary"
                >
                    Register
                </Button>
            }
            <Modal
                show={open}
                onHide={handleClose}
                size="lg"
                aria-labelledby="container-modal-title-vcenter"
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
                        id="contained-modal-title-vcenter "
                    >
                        Register
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ marginBottom: 0, padding: 10, color: "#d94b58" }}>
                        Enter Your Full Name
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
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Here"
                    ></input>
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
                        Register
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Register;