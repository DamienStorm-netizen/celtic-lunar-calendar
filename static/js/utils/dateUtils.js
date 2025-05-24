// dateUtils.js

export function isLeapYear(year = new Date().getFullYear()) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

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

// Convert Gregorian date string (YYYY-MM-DD or Date) to Celtic date string (e.g., "Janus 3")
export function convertGregorianToCeltic(gregorianDate) {
  const monthMapping = {
    "Nivis": { start: "2024-12-23", end: "2025-01-19" },
    "Janus": { start: "2025-01-20", end: "2025-02-16" },
    "Brigid": { start: "2025-02-17", end: "2025-03-16" },
    "Flora": { start: "2025-03-17", end: "2025-04-13" },
    "Maia":  { start: "2025-04-14", end: "2025-05-11" },
    "Juno":  { start: "2025-05-12", end: "2025-06-08" },
    "Solis": { start: "2025-06-09", end: "2025-07-06" },
    "Terra": { start: "2025-07-07", end: "2025-08-03" },
    "Lugh":  { start: "2025-08-04", end: "2025-08-31" },
    "Pomona":{ start: "2025-09-01", end: "2025-09-28" },
    "Autumna":{start: "2025-09-29", end: "2025-10-26"},
    "Eira":  { start: "2025-10-27", end: "2025-11-23" },
    "Aether":{ start: "2025-11-24", end: "2025-12-21" }
  };

  const inputDate = new Date(gregorianDate);
  if (isNaN(inputDate.getTime())) {
    console.error("Invalid Gregorian date:", gregorianDate);
    return "Invalid Date";
  }

  for (const [month, range] of Object.entries(monthMapping)) {
    const start = new Date(range.start);
    const end = new Date(range.end);
    if (inputDate >= start && inputDate <= end) {
      const cDay = Math.floor((inputDate - start) / (86400000)) + 1;
      return `${month} ${cDay}`;
    }
  }

  return "Unknown Date";
}
  
export function getCelticWeekday(celticDay) {
    const weekdays = ["Moonday", "Trésda", "Wyrdsday", "Thornsday", "Freyasday", "Emberveil", "Sunveil"];
    return weekdays[(celticDay - 1) % 7];
}
