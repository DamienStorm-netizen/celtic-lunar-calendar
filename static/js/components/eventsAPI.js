// Fetch all custom events
export async function fetchCustomEvents() {
    try {
        const response = await fetch("/api/custom-events", {
            cache: "no-store", // 💥 Force no-cache
            headers: {
                "Cache-Control": "no-store"
            }
        });
        if (!response.ok) throw new Error("Failed to fetch custom events");
        return await response.json();
    } catch (error) {
        console.error("Error fetching custom events:", error);
        return [];
    }
}

// Delete a custom event
export async function deleteCustomEvent(date) {
    try {
        const response = await fetch(`/api/custom-events/${date}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete event");

        console.log(`Deleted event on ${date}`);
        loadCustomEvents(); // Refresh the list
    } catch (error) {
        console.error("Error deleting event:", error);
    }
}

// Update an existing event
export async function updateCustomEvent(date, updatedData) {
    try {
        const response = await fetch(`/api/custom-events/${date}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) throw new Error("Failed to update event");

        console.log(`Updated event on ${date}`);
        loadCustomEvents(); // Refresh the list
    } catch (error) {
        console.error("Error updating event:", error);
    }
}