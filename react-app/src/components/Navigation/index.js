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
		<div className='pad-tb-25p color-white bg-blue-0bf'>
			<ul className='flx-jc-fe mrg20p '>
				{/* <li>
					<NavLink exact to="/" className={"color-white-ef2 fontS-125rem"}>Home</NavLink>
				</li> */}
				{isLoaded && !sessionUser && (
					<li className='flx gap15p'>
						<div>
							<NavLink to='/login' className={"color-white-ef2 fontS-125rem"}>
								Login
							</NavLink>
						</div>
						<div>
							<NavLink to='/signup' className={"color-white-ef2 fontS-125rem border-white-ef2 borderR-5p pad-tb-5p pad-lr-10p"}>
								Sign up for free
							</NavLink>
						</div>
					</li>
				)}
				{isLoaded && sessionUser && (
					<li className='flx gap15p'>
						<form onSubmit={handleSearch} className='bg-blue-0cc pad8p borderR-5p'>

							<i className="fas fa-search mrg-r-8p"></i>

							<input
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								className='bg-blue-0cc border-0'/>
							<button
								disabled={!query}
								type='submit'>Search</button>
						</form>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>

		</div>
	);
}

export default Navigation;
