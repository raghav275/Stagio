import { css } from "@emotion/css";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { reset } from "@actions/auth";
import { toast } from "react-toastify";
import router from "next/router";
interface Props {
  token: string;
}
const PasswordReset = (props: Props) => {
  const { token } = props;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSubmit = async () => {
    try {
      const res = await reset(token, password);
      toast.dark("Password Change Successful");
      router.push("/");
    } catch (e) {
      const error = e?.response?.data?.message;
      toast.dark(error);
    }
  };
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 10,
      })}
    >
      <div
        className={css({
          fontSize: 40,
          alignSelf: "center",
          fontWeight: 500,
          color: "#ffffff",
          marginTop: 20,
          textAlign: "center",
        })}
      >
        Change Your <span style={{ color: "#d94b58" }}>Password</span>
      </div>
      <div className={css({ width: "50vw" })}>
        <p style={{ marginBottom: 0, padding: 10, color: "#d94b58" }}>
          Enter Your New Password
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
          name="New Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter Here"
        ></input>
        <p style={{ marginBottom: 0, padding: 10, color: "#d94b58" }}>
          Confirm Your New Password
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
          name="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          placeholder="Enter Here"
        ></input>
        <div
          className={css({
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
              textAlign: "center",
            }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const token = params?.id;
  return {
    props: {
      token: token,
    },
  };
};
export default PasswordReset;
