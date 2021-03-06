import React from 'react';
import './ImageLinkForm.css'

/* CHECK THE TACHYONS DOCUMENTATION */
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
		<div>
			<p className='f3'>
				{'This app will detect faces in pictures'}
			</p>
			<div className='center'>
				<div className='form center pa4 br4 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' 
						onChange={onInputChange}/>
					<button 
					className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
					onClick={onButtonSubmit}> Detect </button>	
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;