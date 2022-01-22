import React, { useState } from "react";
import Login from "./Navbar/login";
import Register from "./Navbar/register";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { css } from "@emotion/css";
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/router";
const mainStyle = {
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
};
const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (str: string) => {
    setOpen(true);
    setSelected(str);
  };
  const { data: session, status } = useSession();
  return (
    <div style={mainStyle}>
      <Link href={"/"}>
        <div style={{ position: "absolute", left: 40, cursor: "pointer" }}>
          <p
            style={{
              fontSize: 20,
              fontFamily: "Poppins",
              fontWeight: 700,
              margin: 0,
              color: "#5a5a5a",
            }}
          >
            Sta<span style={{ color: "#d94b58" }}>gio</span>
          </p>
        </div>
      </Link>
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
        <Link href={"/create-event"}>
          <div
            style={{
              fontSize: 15,
              fontFamily: "Poppins",
              fontWeight: 700,
              margin: 0,
              marginRight: 20,
              color: "#ffffff",
              borderBottom: "1px solid #d94b58",
              cursor: "pointer",
            }}
          >
            + Create
          </div>
        </Link>
        {!session ? (
          <>
            {" "}
            <Login status={false} showButton={true} />
            <Register status={false} showButton={true} />
          </>
        ) : (
          <div className={css({ color: "#ffffff" })}>
            <Dropdown>
              <Dropdown.Toggle
                className={css({
                  backgroundColor: "transparent",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "#d94b58",
                  },
                  "&:focus": {
                    backgroundColor: "#d94b58",
                  },
                })}
              >
                Hi {session.user.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    router.push(`/profile/${session.user.username}`);
                  }}
                  className={css({ color: "#d94b58" })}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => signOut()}
                  className={css({ color: "#d94b58" })}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
