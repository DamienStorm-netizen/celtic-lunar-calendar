import json
import ephem
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from datetime import datetime, date, timedelta

moon_descriptions = {
    "New Moon": "The start of a new lunar cycle, symbolising new beginnings and intentions.",
    "Full Moon": {
        "Wolf Moon": "Named after the howling of hungry wolves in midwinter, this moon symbolises strength and survival in the coldest time of the year.",
        "Snow Moon": "Reflecting the heavy snowfall of late winter, the Snow Moon represents the purity and quiet beauty of the season.",
        "Worm Moon": "Named for the thawing ground and the return of worms, this moon signals the rebirth of the soil as spring approaches.",
        "Flower Moon": "Named for the abundance of blooming flowers, this moon symbolises growth and beauty in full swing.",
        "Strawberry Moon": "A tribute to the ripening of strawberries, this moon marks the sweet beginning of summer.",
        "Thunder Moon": "Named for summer’s frequent thunderstorms, this moon carries the energy of midsummer storms. Also known as Buck Moon.",
        "Grain Moon": "Reflecting the ripening fields of grain, this moon celebrates abundance and gratitude for the first harvest. Also known as Sturgeon Moon.",
        "Harvest Moon": "The full moon closest to the autumn equinox, the Harvest Moon lights the way for farmers gathering crops late into the night.",
        "Hunter's Moon": "Traditionally aiding hunters in tracking game, this moon symbolises preparation and sustenance",
        "Frost Moon": "Named for the first frost of the season, this moon marks the transition to winter’s stillness. Also known as Beaver Moon.",
        "Cold Moon": "Reflecting the chill of winter’s embrace, this moon represents endurance and reflection."
    },
    "First Quarter": "A time for taking action on your goals as the moon waxes.",
    "Last Quarter": "A reflective phase as the moon wanes, encouraging release and gratitude."
}

app = FastAPI()

# Mount the directory containing static files
# app.mount("/celtic_wheel", StaticFiles(directory="celtic_wheel"), name="celtic_wheel")

# Serve the "assets", "css", "js" directories as static files
app.mount("/assets", StaticFiles(directory="assets"), name="assets")
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/js", StaticFiles(directory="js"), name="js")

# Route for the main HTML file
@app.get("/")
async def read_root():
    return FileResponse("index.html")

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Celtic Calendar!"}

# Load the JSON data from the file
with open("calendar_data.json", "r") as file:
    calendar_data = json.load(file)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Celtic Calendar API"}

# Display all 13 months
@app.get("/calendar")
def get_calendar():
    return calendar_data


# Display a single month
@app.get("/calendar/month/{month_name}")
def get_month(month_name: str):
    # Search for the month in the calendar data
    for month in calendar_data["months"]:
        if month["name"].lower() == month_name.lower():  # Case-insensitive search
            return {"month": month}
    # If not found, return an error message
    return {"error": f"Month '{month_name}' not found in the Celtic Calendar"}


# Check if the year is a leap year
def is_leap_year(year):
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)


# Show Moon phases per day (static)
@app.get("/lunar-phases")
def get_lunar_phases():
    return calendar_data["lunar_phases"]


# Filter lunar phase by phase, phaseName and date
@app.get("/lunar-phases/filter")
def filter_lunar_phases(phase: str = None, phaseName: str = None, start_date: str = None, end_date: str = None):
    from datetime import datetime
    
    # Filtered result
    filtered_phases = calendar_data["lunar_phases"]

    # Filter by phase
    if phase:
        filtered_phases = [p for p in filtered_phases if p["phase"].lower() == phase.lower()]

    # Filter by phaseName
    if phaseName:
        filtered_phases = [p for p in filtered_phases if p["phaseName"].lower() == phaseName.lower()]
    
    # Filter by date range
    if start_date or end_date:
        start = datetime.fromisoformat(start_date) if start_date else datetime.min
        end = datetime.fromisoformat(end_date) if end_date else datetime.max
        filtered_phases = [p for p in filtered_phases if start <= datetime.fromisoformat(p["date"]) <= end]
    
    return filtered_phases


# Display list of festivals, filtered by name or month
@app.get("/festivals")
def get_festivals(name: str = None, month: str = None, festival_type: str = None):
    festivals = calendar_data["special_days"]

    # Filter by name
    if name:
        festivals = [f for f in festivals if f["name"].lower() == name.lower()]

    # Filter by month
    if month:
        festivals = [
            f for f in festivals
            if datetime.fromisoformat(f["date"]).strftime("%B").lower() == month.lower()
        ]

    # Filter by type
    if festival_type:
        festivals = [f for f in festivals if f["type"].lower() == festival_type.lower()]

    return festivals


# Retrieve festivals that align with lunar phases
@app.get("/festivals/lunar-phases")
def get_festivals_linked_to_phases(phase: str = None, moon_name: str = None):
    festivals = calendar_data["special_days"]
    linked_festivals = []

    # Normalize input for case-insensitive matching
    moon_name_lower = moon_name.lower() if moon_name else None
    phase_lower = phase.lower() if phase else None

    for festival in festivals:
        # Match linked moon
        if moon_name_lower and "linked_moon" in festival:
            if festival["linked_moon"].lower() == moon_name_lower:
                linked_festivals.append(festival)
        # Match linked phase
        elif phase_lower and "linked_phase" in festival:
            if festival["linked_phase"].lower() == phase_lower:
                linked_festivals.append(festival)

    if linked_festivals:
        return {"phase": moon_name or phase, "festivals": linked_festivals}
    return {"message": f"No festivals linked to the phase '{moon_name or phase}'."}


# Display phases of the moon (Dynamic)
@app.get("/dynamic-moon-phases")
def dynamic_moon_phases(start_date: str, end_date: str):
    from datetime import datetime

    start = datetime.fromisoformat(start_date).date()
    end = datetime.fromisoformat(end_date).date()
    moon_phases = calculate_lunar_phases(start, end)

    for phase in moon_phases:
        phase_name = phase["phase"]
        if phase_name == "Full Moon":
            # Assign specific names and descriptions based on the month
            month = datetime.fromisoformat(phase["date"]).month
           
            if month == 1:
                phase["moonName"] = "Wolf Moon"
                phase["description"] = moon_descriptions["Full Moon"]["Wolf Moon"]
            elif month == 2:
                phase["moonName"] = "Snow Moon"
                phase["description"] = moon_descriptions["Full Moon"]["Snow Moon"]
            elif month == 3:
                phase["moonName"] = "Worm Moon"
                phase["description"] = moon_descriptions["Full Moon"]["Worm Moon"]
            elif month == 5:
                phase["moonName"] = "Flower Moon"
                phase["description"] = moon_descriptions["Full Moon"]["Flower Moon"]
            else:
                phase["moonName"] = "Full Moon"
                phase["description"] = "A beautiful full moon with no specific name for this month."
        else:
            # Add generic description for other phases
            phase["moonName"] = None
            phase["description"] = moon_descriptions.get(phase_name, "No description available.")

    return moon_phases

#  Extend the /lunar-phases endpoint to include the poem field.
@app.get("/lunar-phases/poetry")
def get_lunar_phase_poetry(phase_name: str):
    for phase in calendar_data["lunar_phases"]:
        if phase.get("phaseName", "").lower() == phase_name.lower():
            return {
                "phase": phase["phase"],
                "phaseName": phase["phaseName"],
                "description": phase["description"],
                "poem": phase.get("poem", "No poem available."),
                "date": phase["date"]
            }
    return {"message": f"No poetry found for the phase '{phase_name}'."}


# Convert today's date into our Celtic Calendar equivalent
def get_celtic_year_start(year):
    # Winter Solstice is December 21
    solstice = datetime(year - 1, 12, 21)
    print(f"Winter Solstice: {solstice.date()} (weekday: {solstice.weekday()})")

    # Find the next Monday
    days_until_monday = (7 - solstice.weekday()) % 7
    celtic_year_start = solstice + timedelta(days=days_until_monday)
    print(f"Celtic Year Start: {celtic_year_start.date()} (weekday: {celtic_year_start.weekday()})")

    return celtic_year_start

#Display today's date in the Celtic Calendar
def get_celtic_date(gregorian_date):
    year = gregorian_date.year
    celtic_year_start = get_celtic_year_start(year)

    # Adjust the Celtic year if the Gregorian date is past December 21
    if gregorian_date >= datetime(year, 12, 21).date():
        celtic_year_start = get_celtic_year_start(year + 1)

    print(f"Final Celtic Year Start: {celtic_year_start.date()} (Year: {year})")

    # Calculate the number of days since the Celtic year started
    days_since_start = (gregorian_date - celtic_year_start.date()).days
    print(f"Gregorian Date: {gregorian_date}, Days Since Start: {days_since_start}")

    # Define Celtic months (13 months, each with 28 days)
    celtic_months = [
        "Yule", "Janus", "Brigid", "Flora", "Maya", "Juno",
        "Solis", "Terra", "Lugh", "Pomona", "Autumma", "Frost", "Aether"
    ]

    # Handle leap year special days
    if is_leap_year(year) and days_since_start == 8:
        return {"month": "Leap Day", "day": 1}

    # Handle floating day (last day of a regular year)
    if days_since_start == 364:
        return {"month": "Floating Day", "day": 1}

    # Determine the month and day
    month_index = days_since_start // 28
    day = (days_since_start % 28) + 1

    # Handle overflow (fallback)
    if month_index >= len(celtic_months):
        print(f"ERROR: Invalid Month Index {month_index}.")
        return {"month": "Invalid Date", "day": None}

    month = celtic_months[month_index]
    return {"month": month, "day": day}
    

# Display today's date in the Celtic Calendar
@app.get("/celtic-today")
def celtic_today():
    today = datetime.now().date()
    #today = datetime(2024, 12, 31).date()
    celtic_date = get_celtic_date(today)
    return {
        "gregorian_date": today.isoformat(),
        "celtic_month": celtic_date["month"],
        "celtic_day": celtic_date["day"]
    }


# Calculate lunar phases for a range of dates:
def calculate_lunar_phases(start_date, end_date):
    lunar_phases = []

    # Updated moon phase categorisation by age (in days)
    phase_mapping = [
        (0, 1.5, "New Moon", "🌑"),
        (1.5, 7.5, "Waxing Crescent", "🌒"),
        (7.5, 10.5, "First Quarter", "🌓"),
        (10.5, 13.5, "Waxing Gibbous", "🌔"),
        (13.5, 16.5, "Full Moon", "🌕"),  # Expanded Full Moon range
        (16.5, 21.5, "Waning Gibbous", "🌖"),
        (21.5, 24.5, "Last Quarter", "🌗"),
        (24.5, 29.53, "Waning Crescent", "🌘"),
        (29.53, 30.5, "New Moon", "🌑")  # For rounding
    ]

    current_date = start_date
    while current_date <= end_date:
        # Get ephem Moon object
        moon = ephem.Moon(current_date)

        # Calculate Moon Age
        prev_new_moon = ephem.previous_new_moon(current_date)
        moon_age = (current_date - prev_new_moon.datetime().date()).days % 29.53  # Days since last new moon

        # Determine the phase name and graphic
        phase_name, graphic = "Unknown Phase", "❓"
        for start, end, name, icon in phase_mapping:
            if start <= moon_age < end:
                phase_name, graphic = name, icon
                break

        # Debugging information
        illumination = moon.phase  # Illumination percentage
        print(f"DEBUG: Date = {current_date}, Illumination = {illumination:.2f}, Moon Age = {moon_age:.2f}, Phase Name = {phase_name}")

        # Append to results
        lunar_phases.append({
            "date": current_date.isoformat(),
            "phase": phase_name,
            "graphic": graphic,
            "description": f"{phase_name} phase with {illumination:.2f}% illumination.",
        })

        # Increment date
        current_date += timedelta(days=1)

    return lunar_phases


# Display lunar phases for a specific Celtic month
@app.get("/calendar/lunar-phases")
def get_lunar_phases(month_name: str = None):
    # Get the start and end dates of the Celtic month
    for month in calendar_data["months"]:
        if month["name"].lower() == month_name.lower():
            start_date = datetime.fromisoformat(month["start_date"]).date()
            end_date = datetime.fromisoformat(month["end_date"]).date()

            # Calculate lunar phases for this range
            lunar_phases = calculate_lunar_phases(start_date, end_date)
            return {"month": month["name"], "lunar_phases": lunar_phases}

    return {"error": f"Month '{month_name}' not found in the Celtic Calendar"}

# List All Custom Dates
@app.get("/custom-dates")
def list_custom_dates():
    return calendar_data.get("custom_dates", [])

# Add a New Custom Date
@app.post("/custom-dates")
def add_custom_date(custom_date: dict):
    calendar_data.setdefault("custom_dates", []).append(custom_date)
    return {"message": "Custom date added successfully!"}

# Delete a Custom Date
@app.delete("/custom-dates/{date}")
def delete_custom_date(date: str):
    custom_dates = calendar_data.get("custom_dates", [])
    updated_dates = [d for d in custom_dates if d["date"] != date]
    if len(updated_dates) < len(custom_dates):
        calendar_data["custom_dates"] = updated_dates
        return {"message": f"Custom date on {date} deleted successfully!"}
    return {"error": f"No custom date found on {date}."}

# Edit an Existing Custom Date
@app.put("/custom-dates/{date}")
def edit_custom_date(date: str, updated_data: dict):
    custom_dates = calendar_data.get("custom_dates", [])
    for custom_date in custom_dates:
        if custom_date["date"] == date:
            custom_date.update(updated_data)
            return {"message": f"Custom date on {date} updated successfully!"}
    return {"error": f"No custom date found on {date}."}


# Retrieve the Celtic Zodiac sign for a specific date
@app.get("/zodiac")
def get_zodiac_by_date(date: str):
    query_date = datetime.fromisoformat(date).date()
    for sign in calendar_data["zodiac"]:
        start = datetime.fromisoformat(sign["start_date"]).date()
        end = datetime.fromisoformat(sign["end_date"]).date()
        if start <= query_date <= end:
            return {
                "date": date,
                "zodiac_sign": sign["name"],
                "symbolism": sign["symbolism"],
                "animal": sign["animal"],
                "mythical_creature": sign["mythical_creature"]
            }
    return {"message": "No Zodiac sign found for this date."}

# Display all Zodiac signs with their dates and symbolism
@app.get("/zodiac/all")
def list_all_zodiac_signs():
    return calendar_data["zodiac"]


# Lists all Zodiac signs, their meanings, and symbols
@app.get("/zodiac/insights")
def zodiac_insights():
    formatted_zodiac = []
    for sign in calendar_data["zodiac"]:
        formatted_sign = {
            "name": sign["name"],
            "dates": f"{datetime.fromisoformat(sign['start_date']).strftime('%d %B')} to {datetime.fromisoformat(sign['end_date']).strftime('%d %B')}",
            "symbolism": sign["symbolism"],
            "animal": sign["animal"],
            "mythical_creature": sign["mythical_creature"]
        }
        formatted_zodiac.append(formatted_sign)
    return formatted_zodiac

# Allows users to query a specific sign by name for deeper insights
@app.get("/zodiac/insights/{sign_name}")
def get_zodiac_sign_details(sign_name: str):
    for sign in calendar_data["zodiac"]:
        if sign["name"].lower() == sign_name.lower():
            return sign
    return {"message": f"Zodiac sign '{sign_name}' not found."}


# let users stay attuned to the rhythm of the calendar and their magical practices
@app.get("/notifications")
def get_upcoming_events(days_ahead: int = 3):
    today = datetime.now().date()
    upcoming_events = []

    # Combine all events (lunar phases, festivals, custom dates)
    events = calendar_data["lunar_phases"] + calendar_data["special_days"] + calendar_data.get("custom_dates", [])
    
    # Check if events fall within the notification period
    for event in events:
        event_date = datetime.fromisoformat(event["date"]).date()
        days_until = (event_date - today).days
        if 0 < days_until <= days_ahead:
            event_name = event.get("phaseName") or event.get("name") or event.get("phase") or "Unknown Event"
            upcoming_events.append({
                "name": event_name,
                "type": event.get("type", "Lunar Phase"),
                "description": event.get("description", ""),
                "date": event_date.isoformat(),
                "days_until": days_until
            })

    if upcoming_events:
        return {"upcoming_events": upcoming_events}
    return {"message": "No events in the next few days."}


#generate the lunar calendar visuals. This function integrates lunar phase calculations and Celtic date conversions.
@app.get("/calendar/lunar-visuals")
def get_lunar_visuals(month_name: str = None, start_date: str = None, end_date: str = None):
    from datetime import datetime, timedelta
    
    # Define the date range
    if month_name:
        # Retrieve the start and end dates for the given Celtic month
        for month in calendar_data["months"]:
            if month["name"].lower() == month_name.lower():
                start_date = datetime.fromisoformat(month["start_date"]).date()
                end_date = datetime.fromisoformat(month["end_date"]).date()
                break
        else:
            return {"error": f"Month '{month_name}' not found in the Celtic Calendar"}
    elif start_date and end_date:
        start_date = datetime.fromisoformat(start_date).date()
        end_date = datetime.fromisoformat(end_date).date()
    else:
        return {"error": "You must provide either a 'month_name' or 'start_date' and 'end_date'."}

    # Generate lunar phases
    lunar_phases = calculate_lunar_phases(start_date, end_date)

    # Integrate Celtic dates
    visuals = []
    for phase in lunar_phases:
        gregorian_date = datetime.fromisoformat(phase["date"]).date()
        celtic_date = get_celtic_date(gregorian_date)
        visuals.append({
            "date": phase["date"],
            "celtic_date": celtic_date,
            "phase": phase["phase"],
            "graphic": phase["graphic"],
            "description": phase["description"]
        })

    return {
        "month": month_name if month_name else "Custom Range",
        "days": visuals
    }