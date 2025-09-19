-- Migration script to transfer existing custom events from JSON to database
-- This script should be run after importing existing custom_events.json data

-- Sample data migration (to be populated from existing JSON file)
-- INSERT INTO custom_events (id, user_id, date, title, type, category, notes, recurring)
-- VALUES
--   ('1756169212988', 1, '2025-08-26', 'Hot date with Princess!', 'custom-event', '💜 Romantic', 'Hot date with the sexiest Princess ever! Wear your best threads baby because we are painting this town red. Meet at the club at 8:00!', 0);

-- Note: In production, you'll need to:
-- 1. Create a default user account for existing events
-- 2. Import all events from custom_events.json and assign them to this user
-- 3. Or require users to re-create their events after registration