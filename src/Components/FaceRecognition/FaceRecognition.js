import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageURL, boxes}) => {
	return (
		<div className='center ma pa3 parent'>
			{
				imageURL ? 
				<img 
					id='inputImage'
					alt='image_ur_gonna_see' 
					src={imageURL}
					width='500px'
					height='auto'
				/>
				:
				<span
					className = "white f3"> 
					Write a URL to detect the face
				</span>
			}
			{boxes.map(box => {
				return(
					<div
						key = {boxes.indexOf(box)}
						className='bounding-box'
						style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
					>
					</div>
				)
			})}

		</div>
	)
}

export default FaceRecognition;