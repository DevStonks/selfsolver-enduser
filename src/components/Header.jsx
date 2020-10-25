import React, { useContext } from "react";
import icon from "bootstrap-icons/icons/door-closed.svg";
import styles from "./Header.module.css";
import AuthContext from "../contexts/AuthContext";

export default () => {
  const { logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <img src="./selfsolver-logo.png" alt="ConsulTI" className={styles.logo} />
      <h1 className={styles.title}>SELFSOLVER</h1>
      <button type="button" className={styles.logout} onClick={logout}>
        <img src={icon} aria-hidden="true" alt="" />
        Logout
      </button>
    </header>
  );
};
