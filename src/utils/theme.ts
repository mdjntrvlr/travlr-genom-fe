/**
 * Theme utilities for dynamic color theming
 * Allows setting primary, secondary, etc. colors from API responses
 */

import { getBrandBySlug } from '../services/brand.service'

export interface ThemeColors {
    primary?: string;
    secondary?: string;
    accent?: string;
}

const DEFAULT_THEME_COLORS: ThemeColors = {
    primary: '#EC008C',
    secondary: '#6366f1',
    accent: '#f59e0b',
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
        const brand = await getBrandBySlug(clientSlug)
        console.log('__testing123:', brand.raw_data?.color_palette);

        return {
            primary: brand.raw_data?.color_palette.primary || DEFAULT_THEME_COLORS.primary,
            secondary: brand.raw_data?.color_palette.secondary || DEFAULT_THEME_COLORS.secondary,
            accent: brand.raw_data?.color_palette.tertiary || DEFAULT_THEME_COLORS.accent,
        };
    } catch (error) {
        console.error('Failed to fetch client theme:', error);
        return DEFAULT_THEME_COLORS;
    }
};

/**
 * Initialize theme for a client slug
 */
export const initializeClientTheme = async (clientSlug: string) => {
    const colors = await fetchClientTheme(clientSlug)
    setThemeColors(colors)
}
