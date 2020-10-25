import React from "react";
import icon from "bootstrap-icons/icons/door-closed.svg";
import styles from "./Header.module.css";

export default () => (
  <header className={styles.header}>
    <img src="./selfsolver-logo.png" alt="ConsulTI" className={styles.logo} />
    <h1 className={styles.title}>SELFSOLVER</h1>
    <button type="button" className={styles.logout} aria-label="Close">
      <img src={icon} aria-hidden="true" alt="" />
      Logout
    </button>
  </header>
);
