import React, { useEffect, useState } from "react";
import styles from "../styles/Card.module.css";
import Link from "next/link";
import { css } from "@emotion/css";
import { Event } from "@typings/event";
import { useSession } from "next-auth/react";
import { formatISO, parse } from "date-fns";

interface Props {
  event: Event;
}
const Card = (props: Props) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const { title, description, date, time, price, id, poster, banner, users } =
    props.event;
  const [bought, setBought] = useState(false);
  useEffect(() => {
    if (user && users && users.includes(user.email)) {
      setBought(true);
    } else {
      setBought(false);
    }
  }, [user]);
  function mergeDateandTime(date: string, time: string) {
    return `${date.split("T")[0]}T${time.split("T")[1]}`;
  }
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
          <button>{bought ? "Already Bought" : "Buy Ticket"}</button>
        </Link>
      </div>
    </div>
  );
};
export default Card;
