import React, { useState, useEffect } from "react";
import { css, cx } from '@emotion/css'

const Circle = () => {
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
        <img
          width="180px"
          height="180px"
          style={{ objectFit: "cover" }}
          src="https://dilliwaliblog.files.wordpress.com/2020/08/i0m27jp8_400x400.jpg"
        ></img>
      </div>
      <p
        style={{
          color: "#ffffff",
          marginTop: 10,
          fontWeight: 800,
          fontSize: 20,
        }}
      >
        Anuv Jain
      </p>
    </div>
  );
};
export default Circle;
