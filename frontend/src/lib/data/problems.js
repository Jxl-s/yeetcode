export const diffColors = {
	EASY: 'text-green-500',
	MEDIUM: 'text-yellow-500',
	HARD: 'text-red-500'
};

// TODO: move in i18n file
export const diffText = {
	EASY: 'Easy',
	MEDIUM: 'Medium',
	HARD: 'Hard'
};

/**
 * @typedef {Object} BaseProblem The base type for problems.
 * @property {number} number The problem number.
 * @property {string} id The ID of the problem.
 * @property {string} title The title of the problem.
 * @property {keyof diffText} difficulty The difficulty of the problem.
 * @property {number} submissions The number of submitted solutions.
 * @property {number} accepted The number of accepted solutions.
 */

/**
 * @typedef {BaseProblem & {}} ListedProblem A problem that appears on the problem list.
 */

/**
 * @typedef {BaseProblem & {
 *   description: string,
 *   tags: (keyof typeof import('./tags').tags)[]
 * }} Problem A singular problem that is displayed on its own page.
 */
