import Link from 'next/link'
import { useSession, signOut } from 'next-auth/client'
import classes from './main-navigation.module.css'

function MainNavigation() {
	const [session, loading] = useSession()
	function logoutHandler() {
		signOut()
	}

	return (
		<header className={classes.header}>
			<Link href='/'>
				<a>
					<div className={classes.logo}>Next Auth</div>
				</a>
			</Link>
			<nav>
				<ul>
					{!session && !loading && (
						<>
							<li>
								<Link href='/login'>Login</Link>
							</li>
							<li>
								<Link href='/signup'>Create Account</Link>
							</li>
						</>
					)}
					{session && (
						<>
							<li>
								<Link href='/profile'>Profile</Link>
							</li>
							<li>
								<Link href='/favorites'>Favorites</Link>
							</li>
							<li>
								<button onClick={logoutHandler}>Logout</button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default MainNavigation
