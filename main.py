import json
import ephem
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.responses import JSONResponse
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

# Load the JSON data from the file
with open("calendar_data.json", "r") as file:
    calendar_data = json.load(file)

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
def compute_celtic_date(gregorian_date):
    year = gregorian_date.year
    celtic_year_start = get_celtic_year_start(year)

    # Adjust the Celtic year if the Gregorian date is past December 21
    if gregorian_date >= datetime(year, 12, 21).date():
        celtic_year_start = get_celtic_year_start(year + 1)

    # Calculate the number of days since the Celtic year started
    days_since_start = (gregorian_date - celtic_year_start.date()).days

    # Define Celtic months (13 months, each with 28 days)
    celtic_months = [
        "Yule", "Janus", "Brigid", "Flora", "Maya", "Juno",
        "Solis", "Terra", "Lugh", "Pomona", "Autumma", "Frost", "Aether"
    ]

    # Handle leap year special days (if applicable)
    if is_leap_year(year) and days_since_start == 8:
        return {"month": "Leap Day", "day": 1}

    if days_since_start == 364:
        return {"month": "Floating Day", "day": 1}

    month_index = days_since_start // 28
    day = (days_since_start % 28) + 1

    # Fallback for overflow (if any)
    if month_index >= len(celtic_months):
        return {"month": "Invalid Date", "day": None}

    month = celtic_months[month_index]
    return {"month": month, "day": day}

    

# Display today's date in the Celtic Calendar
@app.get("/celtic-today")
def celtic_today():
    today = datetime.now().date()
    celtic_date = compute_celtic_date(today)  # Use the new name here
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


# Load the calendar data from JSON
def load_calendar_data():
    try:
        with open("calendar_data.json", "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return {"custom_events": []}  # Default to an empty list if the file is missing

# Save the calendar data back to JSON
def save_calendar_data(data):
    with open("calendar_data.json", "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

# Load data initially
calendar_data = load_calendar_data()

# ✅ List All Custom Events (FORCE LIVE RELOAD)
@app.get("/custom-events")
def list_custom_events():
    global calendar_data
    calendar_data = load_calendar_data()  # 🛠️ This ensures we NEVER use stale data
    return calendar_data.get("custom_events", [])

# ✅ Add a New Custom Event
@app.post("/custom-events")
def add_custom_event(custom_event: dict):
    required_fields = ["title", "date"]
    
    # Ensure required fields are present
    if not all(field in custom_event for field in required_fields):
        raise HTTPException(status_code=400, detail="Missing required fields: title, date")

    # Default optional fields if missing
    custom_event.setdefault("type", "General")
    custom_event.setdefault("notes", "")

    calendar_data.setdefault("custom_events", []).append(custom_event)
    save_calendar_data(calendar_data)

    return {
        "message": "Custom event added successfully!",
        "event": custom_event
    }

# ✅ Delete a Custom Event
@app.delete("/custom-events/{date}")
def delete_custom_event(date: str):
    global calendar_data  # Ensure we modify the global variable

    custom_events = calendar_data.get("custom_events", [])
    updated_events = [e for e in custom_events if e["date"] != date]

    if len(updated_events) < len(custom_events):
        # Update the calendar data and save
        calendar_data["custom_events"] = updated_events
        save_calendar_data(calendar_data)

        # 💡 **Force reload from JSON (THIS IS THE FIX!)**
        calendar_data = load_calendar_data()  # 🎩✨ Magic trick to refresh data!

        return {"message": f"Custom event on {date} deleted successfully!"}
    
    raise HTTPException(status_code=404, detail=f"No custom event found on {date}.")


# ✅ Edit an Existing Custom Event
@app.put("/custom-events/{date}")
def edit_custom_event(date: str, updated_data: dict):
    custom_events = calendar_data.get("custom_events", [])

    for event in custom_events:
        if event["date"] == date:
            event.update(updated_data)
            save_calendar_data(calendar_data)
            return {"message": f"Custom event on {date} updated successfully!", "event": event}
    
    raise HTTPException(status_code=404, detail=f"No custom event found on {date}.")


# Retrieve the Celtic Zodiac sign for a specific date
@app.get("/zodiac")
def get_zodiac_by_date(date: str):
    from datetime import datetime

    # Parse the query date
    query_date = datetime.fromisoformat(date).date()
    query_month_day = (query_date.month, query_date.day)  # Extract month and day
    print(f"Query Date: {query_date}, Month-Day: {query_month_day}")

    for sign in calendar_data["zodiac"]:
        # Extract month and day from start and end dates
        start = datetime.fromisoformat(sign["start_date"]).date()
        end = datetime.fromisoformat(sign["end_date"]).date()
        start_month_day = (start.month, start.day)
        end_month_day = (end.month, end.day)

        print(f"Checking Zodiac: {sign['name']}")
        print(f"Start Month-Day: {start_month_day}, End Month-Day: {end_month_day}")

        # Check for "normal" ranges (start and end in the same year)
        if start_month_day <= end_month_day:
            if start_month_day <= query_month_day <= end_month_day:
                print(f"Match Found: {sign['name']} (Normal Range)")
                return {
                    "date": date,
                    "zodiac_sign": sign["name"],
                    "symbolism": sign["symbolism"],
                    "animal": sign["animal"],
                    "mythical_creature": sign["mythical_creature"]
                }

        # Check for "wrapped" ranges (e.g., Dec 24 - Jan 20)
        else:
            if query_month_day >= start_month_day or query_month_day <= end_month_day:
                print(f"Match Found: {sign['name']} (Wrapped Range)")
                return {
                    "date": date,
                    "zodiac_sign": sign["name"],
                    "symbolism": sign["symbolism"],
                    "animal": sign["animal"],
                    "mythical_creature": sign["mythical_creature"]
                }

    # No match found
    print("No match found.")


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

# Fetch the moon poem or display a default moon poem
import random

# List of mystical moon poems
moon_poems = [
    "<h3>The Moon’s Gentle Whisper</h3><p>A sliver of light, a quiet song,<br />Guiding the night as dreams drift along.<br />Not yet whole, but softly bright,<br />The moon still weaves her silver light.</p>",
    
    "<h3>Silver Secrets</h3><p>She drifts in shadows, silver-bright,<br />A lantern glowing in the night.<br />Whisper your dreams, let wishes rise,<br />The moon will answer from the skies.</p>",

    "<h3>Moonlit Veil</h3><p>Between the stars and midnight’s hush,<br />She weaves a veil, so soft and lush.<br />Step through the silver, lose your way,<br />And dance where spirits come to play.</p>",

    "<h3>Celestial Tide</h3><p>Moonlight pulls the ocean’s breath,<br />A rhythm old as life and death.<br />Under her glow, the tide obeys,<br />As time drifts on in silver waves.</p>",

    "<h3>Enchanted Glow</h3><p>She watches from her skybound throne,<br />A queen of dreams, forever known.<br />Beneath her glow, all shadows fade,<br />As magic stirs in silver shade.</p>",

    "<h3>Night’s Guardian</h3><p>She keeps the secrets of the night,<br />A guardian bathed in silver light.<br />She hums in silence, soft and low,<br />A melody the dreamers know.</p>"
]

# Fetch a **random** moon poem when the user loads the home screen
@app.get("/api/lunar-phase-poem")
def get_random_moon_poem():
    return {"poem": random.choice(moon_poems)}



@app.get("/api/celtic-date")
def compute_celtic_date():

    # Load the Celtic calendar data
    with open("calendar_data.json") as f:
        celtic_calendar = json.load(f)

    # Current date
    current_date = datetime.now().date()
    weekday = current_date.strftime("%A")  # Example: "Wednesday"
    gregorian_date = current_date.strftime("%B %d")  # Example: "January 31"

    # Loop through your Celtic calendar mapping to find the current Celtic day and month
    for month in celtic_calendar["months"]:
        start_date = datetime.strptime(month["start_date"], "%Y-%m-%d").date()
        end_date = datetime.strptime(month["end_date"], "%Y-%m-%d").date()

        if start_date <= current_date <= end_date:
            # Calculate the Celtic day within this month
            celtic_day = (current_date - start_date).days + 1
            celtic_month = month["name"]  # Example: "Nivis"
            return {
                "day": weekday,
                "celtic_day": celtic_day,
                "month": celtic_month,
                "gregorian_date": gregorian_date
            }

    # If no match is found
    return {"error": "Celtic date not found in the current range"}

if __name__ == "__main__":
    app.run()

@app.get("/api/lunar-phase")
def get_dynamic_moon_phase(day: int, month: int, year: int = datetime.now().year):
    try:
        # Create a date string
        date_str = f"{year}-{month:02d}-{day:02d}"
        
        # Use ephem to get the moon phase for this date
        moon_phase = ephem.Moon(date_str).phase
        
        # Determine the phase name
        if 0 <= moon_phase < 7.4:
            phase_name = "New Moon"
        elif 7.4 <= moon_phase < 14.8:
            phase_name = "First Quarter"
        elif 14.8 <= moon_phase < 22.1:
            phase_name = "Full Moon"
        else:
            phase_name = "Last Quarter"

        return {
            "date": date_str,
            "moon_phase": phase_name,
            "graphic": "🌑🌒🌓🌔🌕🌖🌗🌘"[int(moon_phase // 3.7)]
        }
    
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/zodiac")
def get_zodiac_sign(month: str, day: int):
    for sign in calendar_data["zodiac"]:
        if sign["month"] == month and sign["day"] == day:
            return sign
    return {"message": "No zodiac sign found."}

@app.get("/api/events")
def get_events(month: str, day: int):
    for event in calendar_data["events"]:
        if event["month"] == month and event["day"] == day:
            return event
    return {"message": "No events found."}


# Load custom events from a JSON file (or replace with database logic)
try:
    with open("calendar_data.json", "r") as file:
        calendar_data = json.load(file)
        custom_events = calendar_data.get("custom_events", [])
except FileNotFoundError:
    custom_events = []

@app.get("/api/custom-events")
def get_custom_events():
    return custom_events

# Load national holidays from a JSON file (or replace with database logic)
national_holidays = []  # Ensure it's globally defined
try:
    with open("calendar_data.json", "r") as file:
        calendar_holiday_data = json.load(file)
        national_holidays = calendar_holiday_data.get("national_holidays", [])
except FileNotFoundError:
    national_holidays = []

@app.get("/api/national-holidays")
def get_national_holidays():
    return national_holidays


# Load lunar and solar eclipses
def estimate_eclipses():
    now = ephem.now()

    # Find the next full moon (for lunar eclipses)
    next_full_moon = ephem.next_full_moon(now)
    next_full_moon_date = ephem.Date(next_full_moon).datetime()

    # Find the next new moon (for solar eclipses)
    next_new_moon = ephem.next_new_moon(now)
    next_new_moon_date = ephem.Date(next_new_moon).datetime()

    # Estimate Lunar Eclipse (assuming it happens near a full moon)
    lunar_eclipse_event = {
        "type": "lunar-eclipse",
        "title": "Lunar Eclipse",
        "description": "Shadow and light embrace in celestial dance, a moment between worlds.",
        "date": next_full_moon_date.strftime("%Y-%m-%d %H:%M:%S")
    }

    # Estimate Solar Eclipse (assuming it happens near a new moon)
    solar_eclipse_event = {
        "type": "solar-eclipse",
        "title": "Solar Eclipse",
        "description": "A rare solar eclipse is on the horizon.",
        "date": next_new_moon_date.strftime("%Y-%m-%d %H:%M:%S")
    }

    return [lunar_eclipse_event, solar_eclipse_event]

# API Endpoint for Eclipses
@app.get("/api/eclipse-events")
def eclipse_events():
    events = estimate_eclipses()
    return events


@app.get("/api/calendar-data")
def get_calendar_data():
    try:
        with open("calendar_data.json", "r", encoding="utf-8") as file:
            data = json.load(file)
        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)