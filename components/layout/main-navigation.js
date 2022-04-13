import Link from 'next/link'
import { useSession, signOut } from 'next-auth/client'
import classes from './main-navigation.module.css'

function MainNavigation() {
	const [session, loading] = useSession()
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
							<Link href='/'>Search</Link>
						</li>
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
									<Link href='/favorites'>Favorites</Link>
								</li>
								<li>
									<Link href='/profile'>Profile</Link>
								</li>
								<li>
									<button onClick={logoutHandler}>Logout</button>
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
