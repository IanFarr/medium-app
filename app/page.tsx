import { options } from "./api/auth/[...nextauth]/options";
import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";
import SignOutButton from "./ui/signOutButton";
import TopNavBar from "./ui/components/topNavBar/topNavBar";
import Banner from "./ui/components/banner/banner";
import ArticleFeed from "./ui/components/articleFeed/articleFeed";
import TrendingArticles from "./ui/components/trending/trendingArticles";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div>
      <TopNavBar />
      <Banner />
      {session && <SignOutButton />}
      <TrendingArticles />
      <ArticleFeed />
    </div>
  );
}
