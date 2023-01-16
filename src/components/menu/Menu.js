import { Link } from 'react-router-dom';

const Menu = ({ children }) => {
	return (
		<>
			<div>{children}</div>
		</>
		)
}

/*			<nav className="navbar">
				<Link to="/">Home</Link>
				<Link to="/contact">Contact</Link>
				<Link to="/about">About</Link>
			</nav>
			 */

export default Menu;