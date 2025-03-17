export const formatToLakhs = amount => `${amount / 100000} L`;

export const calculatePosition = value => {
	const min = 500000;
	const max = 3000000;
	const sliderWidth = 100;
	return ((value - min) / (max - min)) * sliderWidth;
};
