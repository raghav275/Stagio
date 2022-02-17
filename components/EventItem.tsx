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
        borderBottom: "1px solid #5a5a5a",
      }}
    >
      <div
        className={css({
          minWidth: 200,
        })}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: 30,
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
        className={css({ display: "flex", flex: 1, justifyContent: "center" })}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: 300,
            color: "#ffffff",
            wordWrap: "normal",
            padding: 30,
          }}
        >
          {title}
        </p>
      </div>
      <div>
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
