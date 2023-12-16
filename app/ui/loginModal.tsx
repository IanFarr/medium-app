"use client";

import React from "react";
import Modal from "./modal/modal";
import ModalInput from "./modal/modalInput";
import ModalActionButton from "./modal/modalActionButton";
import { ModalLink } from "./modal/modalLink";
import { signIn } from "next-auth/react";

interface LoginProps {
  open: boolean;
  switchModal: () => void;
  handleClose: () => void;
}

export default function LoginModal({
  open,
  switchModal,
  handleClose,
}: LoginProps) {
  const initialState = React.useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );
  const initialError = React.useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );
  const initialAuthError = React.useMemo(() => ({ error: "" }), []);

  const [loginStatus, setLoginStatus] = React.useState("idle");
  const [spinning, setSpinning] = React.useState(false);
  const [state, setState] = React.useState(initialState);
  const [error, setError] = React.useState(initialError);
  const [authError, setAuthError] = React.useState(initialAuthError);

  React.useEffect(() => {
    if (loginStatus === "pending") {
      setSpinning(true);
      setAuthError(initialAuthError);
    }
    if (loginStatus === "success") {
      handleClose();
      setSpinning(false);
      setState(initialState);
      setError(initialError);
    }
    if (loginStatus === "error") {
      setSpinning(false);
      setAuthError({ error: "Invalid email or password" });
    }
  }, [handleClose, initialAuthError, initialError, initialState, loginStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  const validateEmail = (email: string) => {
    // eslint-disable-next-line no-useless-escape
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateInput = () => {
    let valid = true;
    let newError = {
      email: "",
      password: "",
    };

    if (!state.email) {
      newError.email = "Please enter your email";
      valid = false;
    } else if (!validateEmail(state.email)) {
      newError.email = "Please enter a valid email";
      valid = false;
    }

    if (!state.password) {
      newError.password = "Please enter your password";
      valid = false;
    } else if (state.password.length < 8) {
      newError.password = "Password must be at least 8 characters";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateInput()) return;
    setLoginStatus("pending");
    const { email, password } = state;
    signIn("credentials", {
      redirect: false,
      email,
      password,
    }).then((result) => {
      if (result?.error) {
        setLoginStatus("error");
      } else {
        setLoginStatus("success");
      }
    });
  };

  const closeModal = () => {
    setState(initialState);
    setError(initialError);
    handleClose();
  };

  const goToCreateAccount = () => {
    setState(initialState);
    setError(initialError);
    switchModal();
  };

  const title = "Sign In";
  const body = (
    <>
      <ModalInput
        label="Your email"
        id="email"
        type="string"
        error={error.email}
        onChange={(e) => handleChange(e)}
      />
      <ModalInput
        label="Password"
        id="password"
        type="password"
        error={error.password}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
  const actions = (
    <>
      <ModalActionButton
        text="Submit"
        id="submit"
        spinning={spinning}
        onClick={() => handleSubmit()}
      />
      <ModalLink text="Create an account" onClick={() => goToCreateAccount()} />
    </>
  );

  const children = {
    title,
    body,
    actions,
  };

  return (
    <>
      <Modal open={open} handleClose={closeModal} error={authError.error}>
        {children}
      </Modal>
    </>
  );
}
