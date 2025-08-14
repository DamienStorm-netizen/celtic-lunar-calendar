// dateUtils.js

// Normalize many possible inputs into a strict ISO date string (YYYY-MM-DD)
function normalizeToISO(input) {
  if (!input) return null;

  if (input instanceof Date) {
    const y = input.getFullYear();
    const m = String(input.getMonth() + 1).padStart(2, "0");
    const d = String(input.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  if (typeof input === "string") {
    const m = input.match(/^(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : null;
  }

  if (typeof input === "object") {
    const y = input.year ?? input.y ?? input.gregorianYear;
    const m = input.month ?? input.m ?? input.gregorianMonth;
    const d = input.day ?? input.d ?? input.gregorianDay;
    if (y && m && d) {
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
  }

  return null;
}

export function isLeapYear(year = new Date().getFullYear()) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Return ISO start/end dates for any Celtic month in a given cycle year.
 * Moved here from calendar.js to avoid circular imports.
 */
export function getMonthRangeISO(monthName, cycleYear) {
  let startDate, endDate;
  switch (monthName) {
    case "Nivis":
      startDate = new Date(Date.UTC(cycleYear - 1, 11, 23));
      endDate   = new Date(Date.UTC(cycleYear,    0, 19));
      break;
    case "Janus":
      startDate = new Date(Date.UTC(cycleYear,    0, 20));
      endDate   = new Date(Date.UTC(cycleYear,    1, 16));
      break;
    case "Brigid":
      startDate = new Date(Date.UTC(cycleYear,    1, 17));
      endDate   = new Date(Date.UTC(cycleYear,    2, 16));
      break;
    case "Flora":
      startDate = new Date(Date.UTC(cycleYear,    2, 17));
      endDate   = new Date(Date.UTC(cycleYear,    3, 13));
      break;
    case "Maia":
      startDate = new Date(Date.UTC(cycleYear,    3, 14));
      endDate   = new Date(Date.UTC(cycleYear,    4, 11));
      break;
    case "Juno":
      startDate = new Date(Date.UTC(cycleYear,    4, 12));
      endDate   = new Date(Date.UTC(cycleYear,    5,  8));
      break;
    case "Solis":
      startDate = new Date(Date.UTC(cycleYear,    5,  9));
      endDate   = new Date(Date.UTC(cycleYear,    6,  6));
      break;
    case "Terra":
      startDate = new Date(Date.UTC(cycleYear,    6,  8));
      endDate   = new Date(Date.UTC(cycleYear,    7,  4));
      break;
    case "Lugh":
      startDate = new Date(Date.UTC(cycleYear,    7,  4));
      endDate   = new Date(Date.UTC(cycleYear,    7, 31));
      break;
    case "Pomona":
      startDate = new Date(Date.UTC(cycleYear,    8,  1));
      endDate   = new Date(Date.UTC(cycleYear,    8, 28));
      break;
    case "Autumna":
      startDate = new Date(Date.UTC(cycleYear,    8, 29));
      endDate   = new Date(Date.UTC(cycleYear,    9, 26));
      break;
    case "Eira":
      startDate = new Date(Date.UTC(cycleYear,    9, 27));
      endDate   = new Date(Date.UTC(cycleYear,   10, 23));
      break;
    case "Aether":
      startDate = new Date(Date.UTC(cycleYear,   10, 24));
      endDate   = new Date(Date.UTC(cycleYear,   11, 21));
      break;
    case "Mirabilis":
      {
        const isLeap = isLeapYear(cycleYear);
        startDate = new Date(Date.UTC(cycleYear,   11, 22));
        endDate   = new Date(Date.UTC(cycleYear,   11, 22 + (isLeap ? 1 : 0)));
      }
      break;
    default:
      console.error("Unknown Celtic month in getMonthRangeISO:", monthName);
      return { startISO: null, endISO: null };
  }
  const pad = (n) => String(n).padStart(2, "0");
  return {
    startISO: `${startDate.getUTCFullYear()}-${pad(startDate.getUTCMonth() + 1)}-${pad(startDate.getUTCDate())}`,
    endISO:   `${endDate.getUTCFullYear()}-${pad(endDate.getUTCMonth() + 1)}-${pad(endDate.getUTCDate())}`
  };
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


// Convert Gregorian date (Date | 'YYYY-MM-DD' | ISO | {year,month,day}) to Celtic date string (e.g., "Janus 3")
export function convertGregorianToCeltic(input) {
  const iso = normalizeToISO(input);
  const d = iso ? new Date(iso + "T00:00:00Z") : new Date(input);

  if (isNaN(d)) {
    console.error("Invalid Gregorian date:", input);
    return "Invalid Date";
  }

  const year = d.getUTCFullYear();
  const dec23 = Date.UTC(year, 11, 23);

  // If date >= Dec 23, it belongs to the next cycle year
  const cycleYear = d.getTime() >= dec23 ? year + 1 : year;

  const monthNames = [
    "Nivis", "Janus", "Brigid", "Flora",
    "Maia", "Juno", "Solis", "Terra",
    "Lugh", "Pomona", "Autumna", "Eira", "Aether", "Mirabilis"
  ];

  for (const month of monthNames) {
    const { startISO, endISO } = getMonthRangeISO(month, cycleYear);
    const start = new Date(startISO + "T00:00:00Z");
    const end   = new Date(endISO   + "T00:00:00Z");

    if (d >= start && d <= end) {
      const diffDays = Math.floor((d.getTime() - start.getTime()) / 86400000);
      if (month === "Mirabilis") {
        // intercalary days
        return diffDays === 0 ? "Mirabilis Solis" : "Mirabilis Noctis";
      }
      return `${month} ${diffDays + 1}`;
    }
  }

  return "Unknown Date";
}
  
export function getCelticWeekday(celticDay) {
    const weekdays = ["Moonday", "Trésda", "Wyrdsday", "Thornsday", "Freyasday", "Emberveil", "Sunveil"];
    return weekdays[(celticDay - 1) % 7];
}

// Get the Celtic weekday name for a given Gregorian date (Date|string|object)
export function getCelticWeekdayFromGregorian(input) {
  const iso = normalizeToISO(input);
  if (!iso) {
    console.error("Invalid Gregorian date for weekday:", input);
    return "";
  }

  const [year, month, day] = iso.split("-").map(Number);

  // Compute UTC timestamps
  const inputUTC = Date.UTC(year, month - 1, day);
  const dec23UTC = Date.UTC(year, 11, 23);

  // Determine cycle start year
  const cycleStartYear = inputUTC >= dec23UTC ? year : year - 1;
  const cycleStartUTC = Date.UTC(cycleStartYear, 11, 23);

  const diffDays = Math.floor((inputUTC - cycleStartUTC) / 86400000);
  const cycleDay = diffDays + 1; // 1-based day in cycle

  return getCelticWeekday(((cycleDay - 1) % 7) + 1);
}