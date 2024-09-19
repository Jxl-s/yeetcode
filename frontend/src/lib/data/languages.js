// Languages will be retrived from the server. This file will contain other information

import CppIcon from '$lib/components/icons/CppIcon.svelte';
import JavaIcon from '$lib/components/icons/JavaIcon.svelte';
import JavaScriptIcon from '$lib/components/icons/JavaScriptIcon.svelte';
import PythonIcon from '$lib/components/icons/PythonIcon.svelte';

/**
 * Info about the language icons in frontend
 * @type {Record<string, any>}
 */
export const languageIcons = {
	python3: PythonIcon,
	java: JavaIcon,
	javascript: JavaScriptIcon,
	cpp: CppIcon
};
