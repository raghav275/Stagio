import React from "react";
import styles from "../styles/Card.module.css";
import Link from "next/link";
import { css } from "@emotion/css";
import { Event } from "@typings/event";

interface Props {
  event: Event;
}
const Card = (props: Props) => {
  const { title, description, date, time, price, id, poster, banner } =
    props.event;
  return (
    <div className={styles.card}>
      <img src={poster} />
      <div className={styles.info}>
        <h3>{title}</h3>
        <p
          className={css({
            textOverflow: "ellipsis",
          })}
        >
          {description}
        </p>
        <Link href={`/event-details/${id}`}>
          <button>Buy Ticket</button>
        </Link>
      </div>
    </div>
  );
};
export default Card;
