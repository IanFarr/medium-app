import styles from './page.module.css'
// import { fetchAllArticles } from './lib/api/article'
// import { fetchNumClapsByArticleId } from '@/app/api/clap/route'
// import { fetchAllCommentsByArticleId } from '@/app/api/comment/route'
import { fetchAllFollowersByUserId } from '@/app/lib/actions'

export default async function Home() {
  // const articles = await fetchAllArticles()
  // console.log(articles)
  const follows = await fetchAllFollowersByUserId(4)
  console.log(follows)
  return (
  <div>
    <h1 className={styles.title}>Hello World</h1>
  </div>
  )
}
