import React, { useEffect, useState } from "react";
import styles from "@/app/ui/utils/spinner/spinner.module.scss";

interface SpinnerProps {
  withDelay: boolean;
  inButton: boolean;
  showBackground: boolean;
}

export default function Spinner({
  withDelay,
  inButton = false,
  showBackground,
}: SpinnerProps) {
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    let spinTimeout: NodeJS.Timeout | null = null;

    if (withDelay && inButton) {
      setSpin(false);
      spinTimeout = setTimeout(() => {
        setSpin(true);
      }, 1000);
    }

    return () => {
      if (spinTimeout) {
        clearTimeout(spinTimeout);
      }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  if (!spin) return null;

  const spinner = <div className={styles.spinner} />;

  if (inButton) return spinner;

  return (
    <div
      className={`${styles.spinnerBackground} ${
        showBackground ? styles.showBackground : ""
      }`}
    >
      {spinner}
    </div>
  );
}
