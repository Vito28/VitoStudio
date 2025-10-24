const USER_KEY = "vs-user";
const SESSION_KEY = "vs-session";

export function saveUser(user) {
  if (!user || typeof user !== "object") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse stored user", error);
    return null;
  }
}

export function setSession(session) {
  if (!session || typeof session !== "object") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession() {
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse session", error);
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export { USER_KEY, SESSION_KEY };
