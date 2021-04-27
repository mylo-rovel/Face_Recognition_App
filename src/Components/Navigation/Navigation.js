import React from 'react';

// we have no state so this is a pure function
//DONT ADD COMMENTS INTO THE JSX CODE. IT WILL THROW ERROR
/* we are adding quick css styles inline. 'flex-end' is to put it at the right side*/
/* CHECK THE TACHYONS DOCUMENTATION */
const Navigation = ({onRouteChange, isSignedIn}) => {
	if (isSignedIn) {
		return(
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick = {() => onRouteChange('signout')}
					className='f3 link dim black underline pa3 pointer'> Sign out </p>
			</nav>
		)
	} else {
		return(
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick = {() => onRouteChange('signin')}
					className='f3 link dim black underline pa3 pointer'> Sign in </p>
				<p onClick = {() => onRouteChange('register')}
					className='f3 link dim black underline pa3 pointer'> Register </p>					
			</nav>
		)					
	}
}

export default Navigation;