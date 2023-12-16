"use client";

import React from "react";
import Modal from "./modal/modal";
import ModalInput from "./modal/modalInput";
import ModalActionButton from "./modal/modalActionButton";
import { ModalLink } from "./modal/modalLink";
import { signIn } from "next-auth/react";

export default function LoginModal() {
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
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(initialState);
  const [error, setError] = React.useState(initialError);
  const [authError, setAuthError] = React.useState(initialAuthError);

  React.useEffect(() => {
    if (loginStatus === "pending") {
      setSpinning(true);
      setAuthError(initialAuthError);
    }
    if (loginStatus === "success") {
      setOpen(false);
      setSpinning(false);
      setState(initialState);
      setError(initialError);
    }
    if (loginStatus === "error") {
      setSpinning(false);
      setAuthError({ error: "Invalid email or password" });
    }
  }, [initialAuthError, initialError, initialState, loginStatus]);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setState(initialState);
    setError(initialError);
    setOpen(false);
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
      <ModalLink
        text="Create an account"
        onClick={() => console.log("Create account!")}
      />
    </>
  );

  const children = {
    title,
    body,
    actions,
  };

  return (
    <>
      <button onClick={handleOpen}>Sign In</button>
      <Modal open={open} handleClose={handleClose} error={authError.error}>
        {children}
      </Modal>
    </>
  );
}
