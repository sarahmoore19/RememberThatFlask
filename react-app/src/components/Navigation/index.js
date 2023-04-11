import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as searchActions from '../../store/search';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [query, setQuery] = useState('');
	let dispatch = useDispatch()
	let history = useHistory();

	const handleSearch = async (e) => {
	  e.preventDefault()
	  dispatch(searchActions.allSearch(query))
      return history.push(`/app/search/${query}`)
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
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='search bar'/>
						<button
						  disabled={!query}
						  type='submit'>Search</button>
					</form>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
