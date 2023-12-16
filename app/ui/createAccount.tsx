"use client";

import React from "react";
import Modal from "./modal/modal";
import ModalInput from "./modal/modalInput";
import ModalActionButton from "./modal/modalActionButton";
import { ModalLink } from "./modal/modalLink";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function CreateAccount() {
  const initialState = React.useMemo(
    () => ({
      name: "",
      email: "",
      password: "",
    }),
    []
  );
  const initialError = React.useMemo(
    () => ({
      name: "",
      email: "",
      password: "",
    }),
    []
  );
  const initialAuthError = React.useMemo(() => ({ error: "" }), []);

  const [status, setStatus] = React.useState("idle");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [spinning, setSpinning] = React.useState(false);
  const [state, setState] = React.useState(initialState);
  const [error, setError] = React.useState(initialError);
  const [authError, setAuthError] = React.useState(initialAuthError);

  React.useEffect(() => {
    if (status === "pending") {
      setSpinning(true);
      setAuthError(initialAuthError);
    }
    if (status === "success") {
      setOpen(false);
      setSpinning(false);
      setState(initialState);
      setError(initialError);
    }
    if (status === "error") {
      setSpinning(false);
    }
  }, [initialAuthError, initialError, initialState, status]);

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
      name: "",
      email: "",
      password: "",
    };
    if (state.name.length < 3) {
      newError.name = "Full name must be at least 3 characters";
      valid = false;
    }
    if (!validateEmail(state.email)) {
      newError.email = "Please enter a valid email address";
      valid = false;
    }
    if (state.password.length < 8) {
      newError.password = "Password must be at least 8 characters";
      valid = false;
    }
    setError(newError);
    return valid;
  };

  const handleClose = () => {
    setState(initialState);
    setError(initialError);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!validateInput()) return;
    setStatus("pending");
    const { name, email, password } = state;
    axios
      .post("/api/user", {
        name,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 201) {
          signIn("credentials", {
            redirect: false,
            email,
            password,
          }).then(() => {
            setStatus("success");
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setAuthError({ error: "An account with this email already exists" });
        } else {
          setAuthError({ error: "Something went wrong. Please try again." });
        }
        setStatus("error");
      });
  };

  const title = "Sign Up";
  const body = (
    <>
      <ModalInput
        label="Your full name"
        id="name"
        type="string"
        error={error.name}
        onChange={(e) => handleChange(e)}
      />
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
        text="< Already have an account? Sign in"
        onClick={() => console.log("Sign in!")}
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
      <button onClick={handleOpen}>Create Account</button>
      <Modal open={open} handleClose={handleClose} error={authError.error}>
        {children}
      </Modal>
    </>
  );
}
