import './styles/styles.css';
import './styles/moonveil-theme.css';
import './router.js';
import './utils/preloader.js';
import './registerSW.js';

import { api } from './utils/api';

if (import.meta.env.DEV) {
  window.api = api; // handy in DevTools console
  console.log('[LunarAlmanac] API base:', import.meta.env.VITE_API_BASE);
  api.health()
    .then((h) => console.log('[LunarAlmanac] health:', h))
    .catch((e) => console.warn('[LunarAlmanac] health failed:', e));
}