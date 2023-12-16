"use client";

import React from "react";
import styles from "@/app/ui/utils/button/button.module.css";
import Spinner from "@/app/ui/utils/spinner/spinner";

interface ButtonProps {
  text: string;
  id: string;
  themes?: Array<string>;
  spinning?: boolean;
  onClick: () => void;
}

export default function Button({
  text,
  id,
  themes = ["primary"],
  spinning = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        themes.includes("primary") ? styles.primary : null
      } ${themes.includes("small") ? styles.small : null} ${
        themes.includes("dark") ? styles.dark : null
      } ${spinning ? styles.spin : null} ${themes.map(
        (theme) => styles[theme]
      )}`}
      id={id}
      onClick={onClick}
    >
      {!spinning && text}
      {spinning && (
        <Spinner withDelay={false} inButton={true} showBackground={false} />
      )}
    </button>
  );
}
