/**
 * @typedef {Object} BaseSubmission The base type for problems.
 * @property {number} id The submission ID
 * @property {keyof submissionStatus} status The status of the submission.
 * @property {number} created_at The time the submission was created.
 * @property {string} language The language of the submission.
 * @property {number} runtime The runtime of the submission.
 * @property {number} memory The memory of the submission.
 */

/**
 * @typedef {BaseSubmission & {}} ListedSubmission A problem that appears on the problem list.
 */

/**
 * @typedef {BaseSubmission & {
 *   code: string,
 *   passed: number,
 * 	 error?: string
 * }} Submission A problem with more details.
 */

export const submissionColors = {
	ACCEPTED: 'text-green-500',
	WRONG_ANSWER: 'text-red-500',

	TIME_LIMIT_EXCEEDED: 'text-yellow-500',
	MEMORY_LIMIT_EXCEEDED: 'text-yellow-500',
	RUNTIME_ERROR: 'text-yellow-500',
	COMPILATION_ERROR: 'text-yellow-500'
};

// TODO: Move into i18n file
export const submissionStatus = {
	ACCEPTED: 'Accepted',
	WRONG_ANSWER: 'Wrong Answer',
	TIME_LIMIT_EXCEEDED: 'Time Limit Exceeded',
	MEMORY_LIMIT_EXCEEDED: 'Memory Limit Exceeded',
	RUNTIME_ERROR: 'Runtime Error',
	COMPILATION_ERROR: 'Compilation Error'
};
