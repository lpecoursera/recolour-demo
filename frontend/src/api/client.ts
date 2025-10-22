import { API_BASE_URL } from '../config'
import { useAuthStore } from '../stores/auth.ts'

interface FetchOptions extends RequestInit {
    // Optional type for response
    parseJson?: boolean,
    includeToken?: boolean
}

/**
 * Wrapper around fetch that prefixes the API base URL
 * and handles common headers, JSON parsing, and errors.
 */
export async function apiFetch<T = unknown>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T | undefined> {
    const { parseJson = true, includeToken = true, headers, ...rest } = options

    const auth = useAuthStore();

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(includeToken && auth.token ? { 'X-User-Id': auth.token } : {}),
            ...headers,
        },
        ...rest,
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(`API error (${response.status}): ${message}`)
    }
    if (response.status === 401) {
        auth.logout?.()
        throw new Error('Unauthorized. Please log in again.')
    }
    if (!parseJson) return response as any

    const resp = await response.json();
    if (resp.success === false) {
        throw new Error(resp.error || "An error for backend occurred");
    }
    if (resp.success === true && resp.data) {
        return resp.data as T
    }
    return undefined;
}
