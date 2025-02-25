import React from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';

const Loader = () => {
	return (
		<ProgressSpinner
			className="m-auto"
			pt={{
				circle: {
					style: {
						stroke: '#D4D4D4',
						strokeWidth: 3,
						animation: 'p-progress-spinner-dash 1.5s ease-in-out infinite'
					}
				}
			}}
		/>
	);
};

export default Loader;
