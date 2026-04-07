const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

export function apiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_URL. Set it in Vercel or client/.env for local development.');
  }

  return `${API_BASE_URL}${path}`;
}
