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
    const inputDate = new Date(gregorianDate);
    if (isNaN(inputDate.getTime())) {
        console.error("Invalid Gregorian date:", gregorianDate);
        return "Invalid Date";
    }

    // Determine cycle (each Celtic year begins on Dec 23)
    const year = inputDate.getFullYear();
    const dec23 = new Date(year, 11, 23);
    const cycleStartYear = inputDate >= dec23 ? year : year - 1;
    const cycleStart = new Date(cycleStartYear, 11, 23);

    // Days since cycle start
    const diffDays = Math.floor((inputDate - cycleStart) / 86400000);

    // Determine if this cycle includes Mirabilis Noctis (leap)
    const isLeap = isLeapYear(cycleStartYear + 1);
    const daysInMonthCycle = 13 * 28;        // 364 days for 13 months
    const totalCycleDays = daysInMonthCycle + 1 + (isLeap ? 1 : 0); // + Mirabilis Solis (+ Mirabilis Noctis if leap)

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
