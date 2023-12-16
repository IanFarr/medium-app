"use client";

import React from "react";
import styles from "./topNavBar.module.css";
import CreateAccount from "../../createAccountModal";
import Login from "../../loginModal";
import Link from "next/link";
import Image from "next/image";
import Button from "../../utils/button/button";

export default function TopNavBar() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleCloseCreate = () => setOpenCreate(false);
  const handleCloseLogin = () => setOpenLogin(false);

  const switchModal = () => {
    setOpenCreate(!openCreate);
    setOpenLogin(!openLogin);
  };

  return (
    <div className={styles.fixedNavBar}>
      <div className={styles.topNavBar}>
        <div className={styles.logo}>
          <Image src="/medium_logo.png" alt="logo" width={35.33} height={20} />
          <Link className={styles.mediumText} href="/">
            Medium
          </Link>
        </div>
        <div className={styles.authButtons}>
          <p className={styles.navLogin} onClick={() => setOpenLogin(true)}>
            Sign in
          </p>
          <Button
            text="Get started"
            id="getStarted"
            themes={["dark", "small"]}
            onClick={() => setOpenCreate(true)}
          />
        </div>
      </div>
      <CreateAccount
        open={openCreate}
        switchModal={switchModal}
        handleClose={handleCloseCreate}
      />
      <Login
        open={openLogin}
        switchModal={switchModal}
        handleClose={handleCloseLogin}
      />
    </div>
  );
}
