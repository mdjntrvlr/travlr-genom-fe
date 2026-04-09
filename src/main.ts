import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'remixicon/fonts/remixicon.css'
import './styles.css'
import { initializeClientTheme } from './utils/theme'

// Determine client slug from domain or query parameter
const getClientSlug = () => {
  // Option 1: From subdomain (e.g., client1.example.com -> 'client1')
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  if (parts.length > 2 && parts[0] !== 'www') {
    return parts[0];
  }

  // Option 2: From query parameter (e.g., ?client=client1)
  const urlParams = new URLSearchParams(window.location.search);
  const clientParam = urlParams.get('client');
  if (clientParam) {
    return clientParam;
  }

  // Option 3: From localStorage or default
  return localStorage.getItem('clientSlug') || 'default';
};

const initApp = async () => {
  const clientSlug = getClientSlug();

  // Initialize theme for the client
  await initializeClientTheme(clientSlug);

  // Create and mount the app
  createApp(App).use(router).mount('#app');
};

initApp();

