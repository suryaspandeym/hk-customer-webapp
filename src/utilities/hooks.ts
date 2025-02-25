// Custom hooks
import { useState } from 'react';
import { useInterval } from 'primereact/hooks';
import useOnScreen from './hooks/useOnScreen';
export { useOnScreen };

export const useTimer = (timer: number) => {
	const [seconds, setSeconds] = useState(timer);
	const [active, setActive] = useState(false);

	useInterval(
		() => {
			if (seconds > 1) setSeconds(prevSecond => prevSecond - 1);
			else {
				setActive(false);
				setSeconds(timer);
			}
		},
		1000,
		active
	);
	return { seconds, active, setActive };
};
