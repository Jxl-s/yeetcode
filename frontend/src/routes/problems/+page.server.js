import { PRIVATE_API_URL } from '$env/static/private';
import axios from 'axios';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// Fetch data from the database
	try {
		const res = await axios.get(PRIVATE_API_URL + '/problems');
		if (res.status !== 200) {
			throw new Error('Failed to fetch data');
		}

		const { data } = res.data;
		return {
			problems: data.map((problem) => ({
				id: problem.id,
				title: problem.title,
				difficulty: problem.difficulty,
				status: 'Completed'
			}))
		};
	} catch (error) {
		console.log(error);
	}

	return {
		problems: [
			{
				id: 'two-sum',
				title: 'Two Sum',
				difficulty: 'Hard',
				status: 'Completed'
			},
			{
				id: 'add-two-numbers',
				title: 'Add Two Numbers',
				difficulty: 'Medium',
				status: 'Completed'
			},
			{
				id: 'longest-substring-without-repeating-characters',
				title: 'Longest Substring Without Repeating Characters',
				difficulty: 'Medium',
				status: 'Completed'
			},
			{
				id: 'median-of-two-sorted-arrays',
				title: 'Median of Two Sorted Arrays',
				difficulty: 'Hard',
				status: 'Completed'
			},
			{
				id: 'longest-palindromic-substring',
				title: 'Longest Palindromic Substring',
				difficulty: 'Medium',
				status: 'Completed'
			},
			{
				id: 'zigzag-conversion',
				title: 'ZigZag Conversion',
				difficulty: 'Medium',
				status: 'Completed'
			},
			{
				id: 'reverse-integer',
				title: 'Reverse Integer',
				difficulty: 'Easy',
				status: 'Completed'
			},
			{
				id: 'string-to-integer-atoi',
				title: 'String to Integer (atoi)',
				difficulty: 'Medium',
				status: 'Completed'
			},
			{
				id: 'palindrome-number',
				title: 'Palindrome Number',
				difficulty: 'Easy',
				status: 'Completed'
			},
			{
				id: 'regular-expression-matching',
				title: 'Regular Expression Matching',
				difficulty: 'Hard',
				status: 'Completed'
			},
			{
				id: 'container-with-most-water',
				title: 'Container With Most Water',
				difficulty: 'Medium',
				status: 'Completed'
			},
			{
				id: 'integer-to-roman',
				title: 'Integer to Roman',
				difficulty: 'Medium',
				status: 'Completed'
			},
			{
				id: 'roman-to-integer',
				title: 'Roman to Integer',
				difficulty: 'Easy',
				status: 'Completed'
			},
			{
				id: 'longest-common-prefix',
				title: 'Longest Common Prefix',
				difficulty: 'Easy',
				status: 'Completed'
			},
			{
				id: '3sum',
				title: '3Sum',
				difficulty: 'Medium',
				status: 'Completed'
			},
			{
				id: '3sum-closest',
				title: '3Sum Closest',
				difficulty: 'Medium',
				status: 'Completed'
			}
		]
	};
}
