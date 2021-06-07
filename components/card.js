import React from "react";
import styles from "../styles/Card.module.css";

const Card = () => {
  return (
    <div className={styles.card}>
      <img src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?auto=format&amp;fit=crop&amp;w=311&amp;q=80&amp;ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" />
      <div class={styles.info}>
        <h3>Suno Bey presents LoL from Home |Tue,Wed, Sat & Sunday</h3>
        <p>
          Lorem Ipsum is simply dummy text from the printing and typeseting
          industry
        </p>
        <button>Read More</button>
      </div>
    </div>
  );
};
export default Card;
