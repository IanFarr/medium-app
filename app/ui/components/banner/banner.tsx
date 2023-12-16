import React from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import BannerSignInButton from "./bannerSignInButton";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        <h2 className={styles.bannerTitle}>Stay curious.</h2>
        <h3 className={styles.bannerSubtitle}>
          Discover stories, thinking, and expertise from writers on any topic.
        </h3>
        <BannerSignInButton />
      </div>
      <div className={styles.bannerImage}>
        <Image src="/quotes.png" alt="logo" width={698} height={648} />
      </div>
    </div>
  );
}
