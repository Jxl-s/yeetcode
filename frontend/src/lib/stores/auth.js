import { get, writable } from 'svelte/store';
import axios from 'axios';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

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
        if (isRefresh) {
            url = '/api/auth/refresh';
        }

		const res = await axios.get(url, {
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

export const axiosInstance = axios.create({
	baseURL: PUBLIC_API_BASE_URL,
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
			const newToken = await fetchToken();
			if (!newToken) return Promise.reject(error);

            const { token } = get(authStore);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
		}

		return Promise.reject(error);
	}
);
