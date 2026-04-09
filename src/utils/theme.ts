/**
 * Theme utilities for dynamic color theming
 * Allows setting primary, secondary, etc. colors from API responses
 */

export interface ThemeColors {
  primary?: string;
  secondary?: string;
  accent?: string;
}

/**
 * Set CSS custom properties for theme colors
 * @param colors - Object with color values (hex codes)
 */
export const setThemeColors = (colors: ThemeColors) => {
  const root = document.documentElement.style;

  if (colors.primary) {
    root.setProperty('--primary-color', colors.primary);
  }

  if (colors.secondary) {
    root.setProperty('--secondary-color', colors.secondary);
  }

  if (colors.accent) {
    root.setProperty('--accent-color', colors.accent);
  }
};

/**
 * Get current theme colors
 */
export const getThemeColors = () => {
  const root = getComputedStyle(document.documentElement);

  return {
    primary: root.getPropertyValue('--primary-color').trim(),
    secondary: root.getPropertyValue('--secondary-color').trim(),
    accent: root.getPropertyValue('--accent-color').trim(),
  };
};

/**
 * Fetch theme colors from API based on client slug/domain
 * @param clientSlug - The client identifier (e.g., from URL or config)
 */
export const fetchClientTheme = async (clientSlug: string): Promise<ThemeColors> => {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`/api/clients/${clientSlug}/theme`);
    const data = await response.json();

    return {
      primary: data.primaryColor,
      secondary: data.secondaryColor,
      accent: data.accentColor,
    };
  } catch (error) {
    console.error('Failed to fetch client theme:', error);
    // Return default colors
    return {
      primary: '#EC008C', // Default pink
      secondary: '#6366f1', // Default indigo
      accent: '#f59e0b', // Default amber
    };
  }
};

/**
 * Initialize theme for a client
 * Call this on app startup with the client slug
 */
export const initializeClientTheme = async (clientSlug: string) => {
  const colors = await fetchClientTheme(clientSlug);
  setThemeColors(colors);
};