import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";
import { User } from "typings/profile";
import Image from 'next/image';
interface Props {
  user: User;
}

//To change the name variable initialization after adding name in registration form and deleting mongoDB records
const Circle = (props: Props) => {
  const { name, profilePic } = props.user;
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div
        style={{
          width: 180,
          height: 180,
          overflow: "hidden",
          borderRadius: 360,
        }}
      >
        <Image
          width="180px"
          height="180px"
          className={css({ objectFit: "cover" })}
          src={profilePic}
        />
      </div>
      <p
        style={{
          color: "#ffffff",
          marginTop: 10,
          fontWeight: 800,
          fontSize: 20,
        }}
      >
        {name || ""}
      </p>
    </div>
  );
};
export default Circle;
