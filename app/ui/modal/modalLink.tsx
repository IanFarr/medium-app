'use client'

import * as React from 'react'
import styles from '@/app/ui/modal/modalLink.module.css';

interface ModalLinkProps {
  text: string;
  onClick: () => void;
}

export const ModalLink = ({ text, onClick }: ModalLinkProps) => (
  <p className={styles.modalLink} onClick={onClick}>
    {text}
  </p>
)