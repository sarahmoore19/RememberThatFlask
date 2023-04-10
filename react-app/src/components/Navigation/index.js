import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [search, setSearch] = useState('');

	const handleSearch = async (e) => {
    e.preventDefault()
		window.alert("TODO",search)
  }

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
					<form onSubmit={handleSearch}>
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='search bar'/>
						<button type='submit'>Search</button>
					</form>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
