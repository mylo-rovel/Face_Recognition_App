import React from 'react';

/* CHECK THE TACHYONS DOCUMENTATION */
const Rank = ({userName, userEntries}) => {
	return(
		<div>
			<div className='white f3'>
				{`Hello ${userName}, your current entry count is`}
			</div>
			<div className='white f1'>
				{userEntries}
			</div>
		</div>
	);
}

export default Rank;