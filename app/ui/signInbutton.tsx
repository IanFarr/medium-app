'use client'

import React from "react";
import { signIn } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button onClick={() => signIn()}>Sign in</button>
  )
}