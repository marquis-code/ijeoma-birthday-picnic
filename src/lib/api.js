const configured = typeof window !== "undefined" ? window.IJEOMA_CONFIG?.apiBase : "";
const envBase = import.meta.env.VITE_API_BASE_URL || "";
export const API_BASE = String(configured || envBase || "").replace(/\/$/, "");

export function apiUrl(path) {
  return `${API_BASE}${path}`;
}
