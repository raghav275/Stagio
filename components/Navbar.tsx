import React, { useState } from "react";
import Login from "./Navbar/login";
import Register from "./Navbar/register";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { css } from "@emotion/css";
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
const mainStyle = {
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0px 20px",
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
      <div style={{ cursor: "pointer" }}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Link href={"/create-event"}>
          <div
            style={{
              fontSize: "0.9em",
              fontFamily: "Poppins",
              fontWeight: 700,
              margin: 0,
              marginRight: 10,
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
                    router.push({
                      pathname: `/profile/${session.user.username}`,
                      query: {
                        my: true,
                      },
                    });
                  }}
                  className={css({ color: "#d94b58" })}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    signOut({ redirect: false });
                    toast.dark("Logged Out Successfully");
                  }}
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
