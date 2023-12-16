"use client";

import React from "react";
import styles from "@/app/ui/modal/modalActionButton.module.css";
import Spinner from "@/app/ui/utils/spinner/spinner";

interface ModalActionButtonProps {
  text: string;
  id: string;
  spinning: boolean;
  onClick: () => void;
}

export default function ModalActionButton({
  text,
  id,
  spinning,
  onClick,
}: ModalActionButtonProps) {
  return (
    <button
      className={`${styles.button} ${spinning ? styles.spin : null}`}
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
