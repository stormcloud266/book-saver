import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import classes from './main-navigation.module.css'

function MainNavigation() {
	const { data: session, status } = useSession()
	const loading = status === 'loading'

	function logoutHandler() {
		signOut()
	}

	return (
		<div className='wrapper'>
			<header className={classes.header}>
				<Link href='/'>
					<a>
						<div className={classes.logo}>
							Book<span>Saver</span>
						</div>
					</a>
				</Link>
				<nav>
					<ul>
						<li>
							<Link href='/'>
								<a className={classes.link}>Search</a>
							</Link>
						</li>
						{!session && !loading && (
							<>
								<li>
									<Link href='/login' className={classes.link}>
										<a className={classes.link}>Login</a>
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
										<a className={classes.link}>Favorites</a>
									</Link>
								</li>
								<li>
									<Link href='/account'>
										<a className={classes.link}>Account</a>
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
