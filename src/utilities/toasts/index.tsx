import { toast as rctToast } from "react-toastify";

export const toast = (type: "SUCCESS" | "ERROR", message: string) => {
	switch (type) {
		case "SUCCESS":
			rctToast.success(message, {
				autoClose: 2000,
				position: "bottom-right"
			});
			break;
		case "ERROR":
			rctToast.error(message || "Something went wrong. Please try again in some time", {
				autoClose: 2000,
				position: "bottom-right"
			});
	}
};
