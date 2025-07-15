export function getEventIcon(event) {
    const typeIconMap = {
      "festival": "🔥",
      "full-moon": "🌕",
      "eclipse": "🌑",
      "holiday": "🎊"
    };
  
    const iconMap = {
      "😎 Friends": "😎",
      "🎉 Celebrations": "🎉",
      "🌸 My Cycle": "🌸",
      "💡 General": "💡",
      "🏥 Health": "🏥",
      "💜 Romantic": "💜",
      "🖥️ Professional": "🖥️",
      "🔥 Date": "🔥"
    };
  
    if (event.type === "custom-event" && event.category) {
      return iconMap[event.category] || "✨";
    }
  
    return typeIconMap[event.type] || "✨";
  }