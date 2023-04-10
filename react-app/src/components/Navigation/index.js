import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && !sessionUser && (
				<li>
					<button>
						<NavLink to='/login'>Login</NavLink>
					</button>
					<button>
						<NavLink to='/signup'>Sign up for Free</NavLink>
					</button>
				</li>
			)}
			{isLoaded && sessionUser && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
