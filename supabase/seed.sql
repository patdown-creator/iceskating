-- Seed Data for Skating School MVP

-- Levels
INSERT INTO levels (id, name, description) VALUES
(uuid_generate_v4(), 'Basic 1', 'Introduction to skating for beginners'),
(uuid_generate_v4(), 'Basic 2', 'Development of basic skills and balance'),
(uuid_generate_v4(), 'Freeskate 1', 'Intermediate skating skills and basic jumps');

-- Classes (Assuming IDs from levels above, simplified for demo)
-- Note: In a real migration, we'd use variables or subqueries
INSERT INTO classes (day, time_slot, ice_location, level_id)
SELECT 'Monday', '4:00 PM - 5:00 PM', 'Rink A', id FROM levels WHERE name = 'Basic 1' LIMIT 1;

INSERT INTO classes (day, time_slot, ice_location, level_id)
SELECT 'Wednesday', '5:30 PM - 6:30 PM', 'Rink B', id FROM levels WHERE name = 'Freeskate 1' LIMIT 1;

-- This script provides a template. Since auth.users are managed by Supabase Auth,
-- users must be created through the UI, and then their profiles can be updated.
