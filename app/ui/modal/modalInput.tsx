"use client";

import React from "react";
import styles from "@/app/ui/modal/modalInput.module.css";

interface ModalInputProps {
  label: string;
  type: string;
  id: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ModalInput({
  label,
  type,
  id,
  error,
  onChange,
}: ModalInputProps) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} id={id} onChange={onChange} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
