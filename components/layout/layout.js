import { Fragment } from 'react'

import MainNavigation from './main-navigation'

function Layout(props) {
	return (
		<Fragment>
			<MainNavigation />
			<main>
				<div className='wrapper'>{props.children}</div>
			</main>
		</Fragment>
	)
}

export default Layout
