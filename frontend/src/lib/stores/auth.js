import { get, writable } from 'svelte/store';
import axios from 'axios';

export const AuthState = {
	None: 0,
	SignedIn: 1,
	SignedOut: 2
};

export const authStore = writable({
	token: null,
	state: AuthState.None
});

export async function fetchToken() {
	try {
		const res = await axios.get('/api/auth/token', {
			withCredentials: true
		});

		if (res.status === 200) {
			// Successfully obtained token
			authStore.update((store) => ({
				...store,
				state: AuthState.SignedIn,
				token: res.data.accessToken
			}));

			return true;
		}
	} catch (error) {
		console.error('Error fetching token:', error);
	}

	// Failed to obtain token
	authStore.update((store) => ({
		...store,
		state: AuthState.SignedOut,
		token: null
	}));

	return false;
}
/**
 * @param {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} method The HTTP method to use
 * @param {string} url The URL to call
 * @param {Object | null} data The data to send with the request
 * @returns
 */
export async function apiCall(method, url, data = null, afterAuth = false) {
	const { token } = get(authStore);

	const config = {
		method,
		url,
		headers: {
			Authorization: `Bearer ${token}`
		},
		data
	};

	try {
		const response = await axios(config);
		return response.data;
	} catch (error) {
		if (error.status === 401 && !afterAuth) {
			await fetchToken();
			return apiCall(method, url, data, true);
		}
	}
}
