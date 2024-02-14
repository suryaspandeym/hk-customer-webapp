export const formatCurrencyINR = (amount: number, options?: any) =>
	amount !== undefined || amount !== null
		? new Intl.NumberFormat("en-IN", {
				// maximumSignificantDigits: 3,
				...(!!options
					? options
					: {
							style: "currency",
							minimumFractionDigits: 2,
							// notation: "compact",
							useGrouping: true,
							currency: "INR",
							compactDisplay: "long"
					  })
		  }).format(amount)
		: "";
