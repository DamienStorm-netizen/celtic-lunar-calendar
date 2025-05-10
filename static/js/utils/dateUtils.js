// dateUtils.js

export function convertCelticToGregorian(celticMonth, celticDay, baseYear = new Date().getFullYear()) {
    // For months that begin in the prior year (like Nivis), adjust the base year accordingly
    const adjustedYear = celticMonth === "Nivis" ? baseYear - 1 : baseYear;
  
    const baseDates = {
      Nivis: `${adjustedYear}-12-23`,
      Janus: `${baseYear}-01-20`,
      Brigid: `${baseYear}-02-17`,
      Flora: `${baseYear}-03-17`,
      Maia: `${baseYear}-04-14`,
      Juno: `${baseYear}-05-12`,
      Solis: `${baseYear}-06-09`,
      Terra: `${baseYear}-07-07`,
      Lugh: `${baseYear}-08-04`,
      Pomona: `${baseYear}-09-01`,
      Autumna: `${baseYear}-09-29`,
      Eira: `${baseYear}-10-27`,
      Aether: `${baseYear}-11-24`,
      Mirabilis: `${baseYear}-12-22`
    };
  
    const startDateStr = baseDates[celticMonth];
    if (!startDateStr) {
      console.error("Invalid Celtic month:", celticMonth);
      return null;
    }
  
    const startDate = new Date(startDateStr + "T00:00:00Z");
    const gregorianDate = new Date(startDate.getTime() + (celticDay - 1) * 86400000);
  
    return {
      gregorianMonth: String(gregorianDate.getUTCMonth() + 1).padStart(2, "0"),
      gregorianDay: String(gregorianDate.getUTCDate()).padStart(2, "0"),
      gregorianYear: gregorianDate.getUTCFullYear()
    };
}
  
export function getCelticWeekday(celticDay) {
    const weekdays = ["Moonday", "Trésda", "Wyrdsday", "Thornsday", "Freyasday", "Stonewatch", "Sunveil"];
    return weekdays[(celticDay - 1) % 7];
  }
