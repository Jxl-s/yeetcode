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
 * @typedef {Object} ListedProblem A problem that appears on the problem list.
 * @property {number} number The problem number
 * @property {string} id The ID of the problem.
 * @property {string} title The title of the problem.
 * @property {keyof diffText} difficulty The difficulty of the problem.
 */

/**
 * @typedef {Object} Problem A singular problem that is displayed in its own page.
 * @property {number} number The problem number
 * @property {string} id The ID of the problem.
 * @property {string} title The title of the problem.
 * @property {string} description The description of the problem.
 * @property {keyof diffText} difficulty The difficulty of the problem.
 * @property {string[]} tags The tags of the problem.
 */
