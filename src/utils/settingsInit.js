// components/settingsInit.js
import {
  setupSettingsEvents,
  renderCustomEventsList,
  attachEventHandlers,
} from '../components/settings.js';

export function initSettingsView() {
  attachEventHandlers();        // add button, toggles, about link
  setupSettingsEvents();        // delegated Edit/Delete handlers
  renderCustomEventsList();     // fetch + render custom events
}