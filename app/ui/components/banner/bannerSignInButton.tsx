"use client";

import React from "react";
import CreateAccount from "../../createAccountModal";
import Login from "../../loginModal";
import Button from "../../utils/button/button";

export default function BannerSignInButton() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleCloseCreate = () => setOpenCreate(false);
  const handleCloseLogin = () => setOpenLogin(false);

  const switchModal = () => {
    setOpenCreate(!openCreate);
    setOpenLogin(!openLogin);
  };

  return (
    <>
      <Button
        text="Start reading"
        id="getStarted"
        themes={["dark", "large"]}
        onClick={() => setOpenCreate(true)}
      />
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
    </>
  );
}
