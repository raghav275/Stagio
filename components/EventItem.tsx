import React from "react";
import Button from "react-bootstrap/Button";
import { Event } from "@typings/event";
import { format } from "date-fns";
import { css } from "@emotion/css";
import Link from "next/link";
interface Props {
  event: Event;
}
const EventItem = (props: Props) => {
  const { date, time, title, description, id } = props.event;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        flexWrap: "wrap",
        borderBottom: "1px solid #5a5a5a",
      }}
    >
      <div
        className={
          //   css({
          //   minWidth: 200,
          // })
          "col-lg-3 col-md-12"
        }
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "2.5vmax",
            fontWeight: 800,
            color: "#5a5a5a",
          }}
        >
          {format(new Date(date), "MMMM")}
          <br />{" "}
          <span style={{ color: "#d94b58" }}>
            {format(new Date(date), "dd")}
          </span>
        </p>
      </div>
      <div
        className={
          // css({ display: "flex", flex: 1, justifyContent: "center" })
          "col-lg-6 col-sm-12"
        }
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "2vmax",
            fontWeight: 300,
            color: "#ffffff",
            wordWrap: "normal",
          }}
        >
          {title}
        </p>
      </div>
      <div
        className="col-lg-3 col-sm-12"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Link href={`/event-details/${id}`}>
          <Button
            style={{
              border: "none",
              backgroundColor: "#d94b58",
              borderRadius: 20,
            }}
          >
            Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default EventItem;
