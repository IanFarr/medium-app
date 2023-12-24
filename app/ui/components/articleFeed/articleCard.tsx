import styles from "./articleCard.module.css";

type ArticleCardProps = {
  title: string;
  body: string;
  userImage: string;
  authorName: string;
  date: string;
  tag: string;
  articleImage: string;
};

export default function ArticleCard({
  title,
  body,
  userImage,
  authorName,
  date,
  tag,
  articleImage,
}: ArticleCardProps) {
  const dataAsMonthAndDay = (date: string) => {
    const dateObject = new Date(date);
    const month = dateObject.toLocaleString("en-US", { month: "long" });
    const day = dateObject.toLocaleString("en-US", { day: "numeric" });
    return `${month} ${day}`;
  };

  const storySample = `${body.slice(0, 100)}...`;

  return (
    <div className={styles.articleCardDiv}>
      <div className={styles.articleCardLeftDiv}>
        <div className={styles.articleCardAuthorDiv}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={userImage} alt="user image" width={17} height={17} />
          <p className={styles.articleCardAuthorName}>{authorName}</p>
        </div>
        <p className={styles.articleCardTitle}>{title}</p>
        <p className={styles.articleCardStorySample}>{storySample}</p>
        <div className={styles.articleCardTagDiv}>
          <p className={styles.articleCardDate}>{dataAsMonthAndDay(date)}</p>
          <p className={styles.articleCardTag}>{tag}</p>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={articleImage}
        alt="article image"
        width={190}
        height={140}
        className={styles.articleCardImage}
      />
    </div>
  );
}
