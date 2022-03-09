import React, { useEffect, useState } from "react";
import styles from "../styles/Card.module.css";
import Link from "next/link";
import { css } from "@emotion/css";
import { BookingStatus, Event } from "@typings/event";
import { useSession } from "next-auth/react";
import { formatISO, parse } from "date-fns";
import { bookingStatus } from "@actions/event";

interface Props {
  event: Event;
}
const Card = (props: Props) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const {
    title,
    description,
    owner,
    date,
    time,
    price,
    id,
    poster,
    banner,
    users,
  } = props.event;
  const [bookingStat, setBookingStat] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (user && owner === user.email) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [user]);
  const bookingStatusFunc = async () => {
    console.log(id);
    console.log(user?.email);
    const statusRes = await bookingStatus(id, user?.email);
    setBookingStat(statusRes.status);
  };
  useEffect(() => {
    bookingStatusFunc();
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
          <button>
            {isOwner ? "View Show" : bookingStat===BookingStatus.Bought ? "Already Bought" : "Buy Ticket"}
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Card;
