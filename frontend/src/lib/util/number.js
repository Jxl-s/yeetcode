/**
 * Formats a number into a more readable string with suffixes like K, M, B, etc.
 * @param {number} num - The number to format.
 * @param {number} [decimals=1] - The number of decimal places to include.
 * @returns {string} - The formatted number.
 */
export function formatNumber(num, decimals = 1) {
	if (num === null || num === undefined) return '0';
	if (num < 1000) return num.toString();

	const units = ['K', 'M', 'B', 'T'];
	const unitIndex = Math.floor((num.toString().length - 1) / 3) - 1;
	const unitValue = Math.pow(1000, unitIndex + 1);

	const formattedNumber = (num / unitValue).toFixed(decimals);

	return `${formattedNumber}${units[unitIndex]}`;
}
