import React from 'react';
import './Logo.css';
import brain from './brain_icon.png';
import Tilt from 'react-tilt';
// const Tilt = require('react-tilt');

/* CHECK THE TACHYONS DOCUMENTATION */
const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
			 	<div className="Tilt-inner"> 
			 		<img  src={brain} alt='brain_Logo'/>
			 	</div>
			</Tilt>
		</div>
	)
}

export default Logo;