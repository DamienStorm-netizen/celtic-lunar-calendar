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
    // Parse input into year, month, day
    let year, month, day;
    if (typeof gregorianDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(gregorianDate)) {
        [year, month, day] = gregorianDate.split("-").map(Number);
    } else {
        const d = new Date(gregorianDate);
        if (isNaN(d.getTime())) {
            console.error("Invalid Gregorian date:", gregorianDate);
            return "Invalid Date";
        }
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
    }

    // Compute UTC timestamps for comparison
    const inputUTC = Date.UTC(year, month - 1, day);
    const dec23UTC = Date.UTC(year, 11, 23);

    // Determine cycle start year
    const cycleStartYear = inputUTC >= dec23UTC ? year : year - 1;
    const cycleStartUTC = Date.UTC(cycleStartYear, 11, 23);

    // Days since cycle start
    const diffDays = Math.floor((inputUTC - cycleStartUTC) / 86400000);

    // Determine if this cycle includes Mirabilis Noctis (leap)
    const isLeap = isLeapYear(cycleStartYear + 1);
    const daysInMonthCycle = 13 * 28;        // 364 days for 13 months
    const totalCycleDays = daysInMonthCycle + 1 + (isLeap ? 1 : 0);

    // If outside the whole cycle, unknown
    if (diffDays < 0 || diffDays >= totalCycleDays) {
        return "Unknown Date";
    }

    // Standard months (Nivis through Aether)
    if (diffDays < daysInMonthCycle) {
        const monthNames = [
            "Nivis", "Janus", "Brigid", "Flora",
            "Maia", "Juno", "Solis", "Terra",
            "Lugh", "Pomona", "Autumna", "Eira", "Aether"
        ];
        const monthIndex = Math.floor(diffDays / 28);
        const dayInMonth = (diffDays % 28) + 1;
        return `${monthNames[monthIndex]} ${dayInMonth}`;
    }

    // Intercalary day one
    if (diffDays === daysInMonthCycle) {
        return "Mirabilis Solis";
    }

    // Intercalary day two (only on leap cycles)
    if (isLeap && diffDays === daysInMonthCycle + 1) {
        return "Mirabilis Noctis";
    }

    return "Unknown Date";
}
  
export function getCelticWeekday(celticDay) {
    const weekdays = ["Moonday", "Trésda", "Wyrdsday", "Thornsday", "Freyasday", "Emberveil", "Sunveil"];
    return weekdays[(celticDay - 1) % 7];
}

// Get the Celtic weekday name for a given Gregorian date string (YYYY-MM-DD)
export function getCelticWeekdayFromGregorian(gregorianDate) {
    // Parse input into year, month, day
    let year, month, day;
    if (typeof gregorianDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(gregorianDate)) {
        [year, month, day] = gregorianDate.split("-").map(Number);
    } else {
        const d = new Date(gregorianDate);
        if (isNaN(d.getTime())) {
            console.error("Invalid Gregorian date for weekday:", gregorianDate);
            return "";
        }
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
    }

    // Compute UTC timestamps
    const inputUTC = Date.UTC(year, month - 1, day);
    const dec23UTC = Date.UTC(year, 11, 23);

    // Determine cycle start year
    const cycleStartYear = inputUTC >= dec23UTC ? year : year - 1;
    const cycleStartUTC = Date.UTC(cycleStartYear, 11, 23);

    const diffDays = Math.floor((inputUTC - cycleStartUTC) / 86400000);
    const cycleDay = diffDays + 1;  // 1-based day in cycle

    return getCelticWeekday(((cycleDay - 1) % 7) + 1);
}
