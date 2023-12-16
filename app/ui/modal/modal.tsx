'use client'

import React from 'react';
import styles from '@/app/ui/modal/modal.module.css';
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  error?: string;
  children: {
    title: string;
    body: React.JSX.Element;
    actions: React.JSX.Element;
  };
}

export default function Modal({ children, handleClose, open, error }: ModalProps) {

  if (!open) return null;

  return (
    <>
      <div className={styles.darkBG} onClick={() => handleClose()}/>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.modalError}>{error}</p>
            <h1 className={styles.heading}>{children.title}</h1>
          </div>
          <button className={styles.closeBtn} onClick={() => handleClose()}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            {children.body}
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              {children.actions}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}