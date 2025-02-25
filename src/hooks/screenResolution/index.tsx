import { useEffect, useState } from "react";
import { WIDTH_KEYS } from "@utilities/constants";

import { useResizeListener } from "primereact/hooks";

export const useWindowWidth = () => {
	const [eventData, setEventData] = useState({ width: 0, height: 0 });

	const [bindWindowResizeListener, unbindWindowResizeListener] = useResizeListener({
		listener: (event) => {
			setEventData({
				width: event.currentTarget.innerWidth,
				height: event.currentTarget.innerHeight
			});
		}
	});

	useEffect(() => {
		setEventData({ width: window.innerWidth, height: window.innerHeight });
	}, []);

	useEffect(() => {
		bindWindowResizeListener();

		return () => {
			unbindWindowResizeListener();
		};
	}, [bindWindowResizeListener, unbindWindowResizeListener]);
	const screenSizeWidth = (width: number) => {
		if (width < 640) {
			return WIDTH_KEYS.SM;
		} else if (width < 768) {
			return WIDTH_KEYS.MD;
		} else if (width < 960) {
			return WIDTH_KEYS.LG;
		} else if (width < 1024) {
			return WIDTH_KEYS.XL;
		}
		return WIDTH_KEYS.XXL;
		// } else if (width < 1536) {
		// 	return WIDTH_KEYS.XXL;
		// } else {
		// 	return WIDTH_KEYS.XXXL;
		// }
	};

	return {
		width: screenSizeWidth(eventData.width)
		// height: eventData.height,
	};
};
