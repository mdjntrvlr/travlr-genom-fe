# Navigation Utils

This directory contains utility functions for navigation within the application.

## navigation.ts

Provides helper functions for navigating between prototype pages while maintaining the parent route structure.

### Functions

#### `navigateToPage(targetPage: string)`
Generic navigation function that replaces the current page segment with the target page.

**Example:**
```typescript
navigateToPage('detail'); // navigates to detail page
navigateToPage('search'); // navigates to search page
```

#### `navigateToPrototypeDetail()`
Navigates to the detail page from any current page.

#### `navigateToPrototypeHome()`
Navigates to the home page from any current page.

#### `navigateToPrototypeSearch()`
Navigates to the search page from any current page.

### Usage Examples

```typescript
import { navigateToPrototypeDetail, navigateToPrototypeHome, navigateToPrototypeSearch } from '@/utils/navigation';

// In a component
const handleCardClick = () => {
  navigateToPrototypeDetail(); // Works from /prototype/home → /prototype/detail or /prototype-builder/home → /prototype-builder/detail
};

const handleBackClick = () => {
  navigateToPrototypeHome(); // Works from any page back to home
};
```

### How it works

The helper functions automatically detect the current route structure and maintain the parent path while changing only the page segment. This ensures consistent navigation whether you're in `/prototype/*` or `/prototype-builder/*` routes.