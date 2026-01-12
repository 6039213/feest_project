CREATE DATABASE IF NOT EXISTS feest_db;
USE feest_db;

DROP TABLE IF EXISTS activities;

CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type ENUM('binnen', 'buiten') NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    description TEXT,
    lat DECIMAL(10, 6),
    lon DECIMAL(10, 6)
);

INSERT INTO activities (title, type, date, time, description, lat, lon) VALUES
('Beach Rave Scheveningen', 'buiten', '2026-06-15', '22:00:00', 'Dansen op het strand met de beste DJs', 52.1081, 4.2731),
('Neon Glow Party', 'binnen', '2026-02-20', '21:00:00', 'Blacklight en fluorescerende verf in Club Nova', 52.3676, 4.9041),
('Vondelpark Festival', 'buiten', '2026-07-10', '14:00:00', 'Muziek en food trucks in het park', 52.3579, 4.8686),
('Rooftop Sunset Session', 'buiten', '2026-05-25', '18:00:00', 'Chill vibes op het dakterras van Rotterdam', 51.9244, 4.4777),
('Underground Techno Night', 'binnen', '2026-03-08', '23:00:00', 'Harde beats in een oude fabriek', 52.0907, 5.1214);
