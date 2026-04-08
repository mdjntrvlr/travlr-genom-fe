import router from '../router';

/**
 * Navigation helper for prototype routes
 * Replaces the current page segment (e.g., 'home') with a target page segment (e.g., 'detail')
 * while maintaining the parent route structure
 */
export const navigateToPrototypePage = (targetPage: string) => {
    const route = router.currentRoute.value;

    // Get the current path and extract the last segment
    const pathSegments = route.path.split('/');
    const currentPage = pathSegments[pathSegments.length - 1];

    // Replace the current page with the target page
    const newPath = route.path.replace(`/${currentPage}`, `/${targetPage}`);

    router.push(newPath);
};

/**
 * Specific helper for navigating to detail page from any page
 */
export const navigateToPrototypeDetail = () => {
    navigateToPrototypePage('detail');
};

/**
 * Specific helper for navigating to home page from any page
 */
export const navigateToPrototypeHome = () => {
    navigateToPrototypePage('home');
};

/**
 * Specific helper for navigating to search page from any page
 */
export const navigateToPrototypeSearch = () => {
    navigateToPrototypePage('search');
};