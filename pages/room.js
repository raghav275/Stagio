import React, { useState } from "react";
import Sidechat from "../components/sidechat";
const Room = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#2525259e",
      }}
    >
      <div
        style={{ width: "100%", background: "black" }}
        className={!open ? "video open" : "video"}
      ></div>
      <div
        className={open ? "side-drawer open" : "side-drawer"}
        style={{ width: "25%", height: "100%", alignSelf: "flex-end" }}
      >
        <Sidechat open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};
export default Room;
