export const formatCurrencyINR = (amount: number) =>
    amount !== undefined || amount !== null ? new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(amount) : "";
