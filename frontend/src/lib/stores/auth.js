import { get, writable } from 'svelte/store';
import axios, { AxiosError } from 'axios';

export const AuthState = {
	None: 0,
	SignedIn: 1,
	SignedOut: 2
};

export const authStore = writable({
	token: null,
	state: AuthState.None
});

export async function fetchToken(isRefresh = false) {
	try {
		let url = '/api/auth/token';
		let method = 'get';

		if (isRefresh) {
			url = '/api/auth/refresh';
			method = 'post';
		}

		const res = await axios.request({
			url,
			method,
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
		if (error instanceof AxiosError) {
			console.error('Error fetching token:', error);

			// Failed to obtain token
			if (error.status === 401 || error.status === 403) {
				authStore.update((store) => ({
					...store,
					state: AuthState.SignedOut,
					token: null
				}));
			}
		}
	}

	return false;
}

export async function signOut() {
	try {
		const res = await axios.post('/api/auth/signout', {
			withCredentials: true
		});

		if (res.status === 200) {
			authStore.update((store) => ({
				...store,
				state: AuthState.SignedOut,
				token: null
			}));

			return true;
		}
	} catch (e) {
		console.error('Error signing out:', e);
		return false;
	}
}

export const axiosInstance = axios.create({
	baseURL: '/api',
	withCredentials: false,
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosInstance.interceptors.request.use(
	(config) => {
		const { token } = get(authStore);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// Fetch a new token and retry
			const newTokenSuccess = await fetchToken(true);
			if (newTokenSuccess) {
				// Update token, re-try request
				const { token } = get(authStore);
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				return axiosInstance(originalRequest);
			}
		}

		return Promise.reject(error);
	}
);
