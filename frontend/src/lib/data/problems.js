export const diffColors = {
	EASY: 'text-green-500',
	MEDIUM: 'text-yellow-500',
	HARD: 'text-red-500'
};

export const diffText = {
	EASY: 'Easy',
	MEDIUM: 'Medium',
	HARD: 'Hard'
};

/**
 * @typedef {Object} Problem
 * @property {number} number The problem number
 * @property {string} id The ID of the problem.
 * @property {string} title The title of the problem.
 * @property {keyof diffText} difficulty The difficulty of the problem.
 */
