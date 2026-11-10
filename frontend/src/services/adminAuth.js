const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const TOKEN_KEY = "aia_admin_token";

export const getAdminToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const saveAdminToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const adminRequest = async (endpoint, options = {}) => {
  const token = getAdminToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      clearAdminToken();
    }

    throw new Error(result.message || "Request failed.");
  }

  return result;
};

export const loginAdmin = async (email, password) => {
  const result = await adminRequest("/admin-auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!result.token) {
    throw new Error("Authentication token was not received.");
  }

  saveAdminToken(result.token);

  return result;
};

export const verifyAdmin = async () => {
  if (!getAdminToken()) return null;

  try {
    const result = await adminRequest("/admin-auth/me");
    return result.admin;
  } catch {
    clearAdminToken();
    return null;
  }
};

export const logoutAdmin = async () => {
  try {
    if (getAdminToken()) {
      await adminRequest("/admin-auth/logout", {
        method: "POST",
      });
    }
  } finally {
    clearAdminToken();
  }
};