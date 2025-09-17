// src/utils/eventUtils.js
export function getEventIcon(evt) {
  const CATEGORY_ICON_MAP = {
    "😎 Friends": "😎",
    "🎉 Celebrations": "🎉",
    "🌸 My Cycle": "🌸",
    "💡 General": "💡",
    "🏥 Health": "🏥",
    "💜 Romantic": "💜",
    "🖥️ Professional": "🖥️",
    "🔥 Date": "🔥",
    "🎂 Birthday": "🎂"
  };
  const TYPE_ICON_MAP = {
    "festival": "🔥",
    "full-moon": "🌕",
    "eclipse": "🌑",
    "holiday": "🎊",
    "custom-event": "💡"   // default if category is missing
  };

  // Prefer explicit category
  if (evt?.category && CATEGORY_ICON_MAP[evt.category]) {
    return CATEGORY_ICON_MAP[evt.category];
  }

  // If someone ever stuffs the category into type (e.g. "🔥 Date"), still handle it
  if (evt?.type && CATEGORY_ICON_MAP[evt.type]) {
    return CATEGORY_ICON_MAP[evt.type];
  }

  // Fall back to type map, then sparkle
  return TYPE_ICON_MAP[evt?.type] || "✨";
}