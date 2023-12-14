import { options } from './api/auth/[...nextauth]/options'
import styles from './page.module.css'
import { getServerSession } from 'next-auth/next'
import SignOutButton from './ui/signOutButton'
import SignInButton from './ui/signInbutton'

export default async function Home() {
  const session = await getServerSession(options)

  return (
  <div>
    <h1 className={styles.title}>Hello World</h1>
    {!session && <SignInButton />}
    {session && <SignOutButton />}
  </div>
  )
}
