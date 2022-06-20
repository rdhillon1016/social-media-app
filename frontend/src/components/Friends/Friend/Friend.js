import React from "react";
import styles from "./Friend.module.css";

const Friend = (props) => {
  return (
    <div className={styles["fr"]}>
      <div className={styles["name-pic"]}>
        <img src={props.pic} alt="pic" />
        <div className={styles["names"]}>
          <div>{props.name}</div>
          <div className={styles["username"]}>{props.username}</div>
        </div>
      </div>
      <div className={styles["fr-buttons"]}>
        <div>Delete</div>
      </div>
    </div>
  );
};

export default Friend;
