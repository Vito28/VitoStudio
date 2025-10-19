export async function initAuthParticles(page) {
  if (typeof window === "undefined" || typeof window.particlesJS === "undefined") {
    return;
  }

  const containerId = "auth-particles";
  const configPath = getConfigPath(page);

  if (!configPath) return;

  try {
    const response = await fetch(configPath, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to load particles configuration");
    const config = await response.json();
    window.particlesJS(containerId, config);
  } catch (error) {
    console.error("Particles init error:", error);
  }
}

function getConfigPath(page) {
  switch (page) {
    case "signin":
      return "../../assets/particles/signin.json";
    case "signup":
      return "../assets/particles/signup.json";
    default:
      return null;
  }
}
