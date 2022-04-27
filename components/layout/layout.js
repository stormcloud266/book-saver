import { Fragment } from 'react'
import MainNavigation from './main-navigation'

const Layout = (props) => {
	return (
		<Fragment>
			<MainNavigation />
			<main>
				<div className='wrapper'>{props.children}</div>
			</main>
			<div id='modal'></div>
		</Fragment>
	)
}

export default Layout
