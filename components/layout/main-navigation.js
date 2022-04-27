import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import styles from './main-navigation.module.css'

function MainNavigation() {
	const { data: session, status } = useSession()
	const loading = status === 'loading'

	function logoutHandler() {
		signOut()
	}

	return (
		<div className='wrapper'>
			<header className={styles.header}>
				<Link href='/'>
					<a>
						<div className={styles.logo}>
							Book<span>Saver</span>
						</div>
					</a>
				</Link>
				<nav>
					<ul>
						<li>
							<Link href='/'>
								<a className={styles.link}>Search</a>
							</Link>
						</li>
						{!session && !loading && (
							<>
								<li>
									<Link href='/login' className={styles.link}>
										<a className={styles.link}>Login</a>
									</Link>
								</li>
								<li>
									<Link href='/signup'>
										<a className='button secondary'>Create Account</a>
									</Link>
								</li>
							</>
						)}
						{session && (
							<>
								<li>
									<Link href='/favorites'>
										<a className={styles.link}>Favorites</a>
									</Link>
								</li>
								<li>
									<Link href='/account'>
										<a className={styles.link}>Account</a>
									</Link>
								</li>
								<li>
									<button onClick={logoutHandler} className='button secondary'>
										Logout
									</button>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
		</div>
	)
}

export default MainNavigation
