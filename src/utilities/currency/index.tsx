export const formatCurrencyINR = (amount: number, options?: any) =>
	amount !== undefined || amount !== null
		? new Intl.NumberFormat("en-IN", {
				maximumSignificantDigits: 3,
				...(!!options
					? { ...options, currency: options.currency || "INR" }
					: {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
							useGrouping: true,
							compactDisplay: "long"
					  })
		  }).format(amount)
		: "";
