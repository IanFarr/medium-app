import styles from "./trendingArticleCard.module.css";

type TrendingArticleCardProps = {
  title: string;
  userImage: string;
  authorName: string;
  date: string;
  index: number;
};

export default function TrendingArticleCard({
  title,
  userImage,
  authorName,
  date,
  index,
}: TrendingArticleCardProps) {
  const dataAsMonthAndDay = (date: string) => {
    const dateObject = new Date(date);
    const month = dateObject.toLocaleString("en-US", { month: "long" });
    const day = dateObject.toLocaleString("en-US", { day: "numeric" });
    return `${month} ${day}`;
  };

  const storyRank = `0${index + 1}`;

  return (
    <div className={styles.trendingArticleCardDiv}>
      <p className={styles.trendingArticleCardRank}>{storyRank}</p>
      <div className={styles.trendingArticleCardRightDiv}>
        <div className={styles.trendingArticleCardAuthorDiv}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={userImage} alt="user image" width={15} height={15} />
          <p className={styles.trendingArticleCardAuthorName}>{authorName}</p>
        </div>
        <p className={styles.trendingArticleCardTitle}>{title}</p>
        <p className={styles.trendingArticleCardDate}>
          {dataAsMonthAndDay(date)}
        </p>
      </div>
    </div>
  );
}
