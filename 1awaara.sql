CREATE DATABASE IF NOT EXISTS awaara_travel;
USE awaara_travel;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE destinations (
    destination_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    popularity_rating DECIMAL(3,1)
);

CREATE TABLE goa_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    package_type ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
    travel_date DATE NOT NULL,
    persons INT NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE kashmir_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    package_type ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
    travel_date DATE NOT NULL,
    persons INT NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE agra_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    package_type ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
    travel_date DATE NOT NULL,
    persons INT NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    special_requests TEXT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE mumbai_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    package_type ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
    travel_date DATE NOT NULL,
    persons INT NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    special_requests TEXT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE amritsar_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    package_type ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
    travel_date DATE NOT NULL,
    persons INT NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    special_requests TEXT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE rajasthan_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    package_type ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
    travel_date DATE NOT NULL,
    persons INT NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    special_requests TEXT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE hyderabad_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    package_type ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
    travel_date DATE NOT NULL,
    persons INT NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    special_requests TEXT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE packages (
    package_id INT AUTO_INCREMENT PRIMARY KEY,
    destination_id INT NOT NULL,
    package_type ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(20) NOT NULL,
    features TEXT NOT NULL,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id)
);

CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    destination_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(100),
    comment TEXT NOT NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id)
);

CREATE TABLE contact_submissions (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(100),
    message TEXT NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Sample Data for Awaara Travel Database
USE awaara_travel;

-- Insert Destinations
INSERT INTO destinations (name, description, image_url, popularity_rating) VALUES
('Goa', 'Famous for beaches and nightlife', 'images/p-1.jpg', 4.8),
('Jammu and Kashmir', 'Known for its stunning landscapes', 'images/p-6.jpg', 4.9),
('Agra', 'Home of the Taj Mahal', 'images/p-3.jpg', 4.7),
('Mumbai', 'Financial capital of India', 'images/p-4.jpg', 4.5),
('Amritsar', 'Golden Temple city', 'images/p-5.jfif', 4.6),
('Rajasthan', 'Land of kings and palaces', 'images/g-4.jpg', 4.7),
('Hyderabad', 'City of pearls and biryani', 'images/p-2.jpg', 4.4);

-- Insert Packages
INSERT INTO packages (destination_id, package_type, price, duration, features) VALUES
(1, 'Silver', 5999, '3D/2N', 'Beaches, Churches, 2 meals/day'),
(1, 'Gold', 8999, '5D/4N', 'Beaches, Churches, Waterfalls, 3 meals/day'),
(1, 'Platinum', 12999, '7D/6N', 'All attractions + Private tours, All inclusive'),
(2, 'Silver', 7999, '4D/3N', 'Srinagar, Gulmarg, 2 meals/day'),
(2, 'Gold', 11999, '6D/5N', 'Srinagar, Gulmarg, Pahalgam, 3 meals/day'),
(2, 'Platinum', 16999, '8D/7N', 'Full Kashmir tour, All inclusive');

-- Insert Sample Users
INSERT INTO users (username, email, password_hash, full_name, phone) VALUES
('traveler1', 'user1@example.com', SHA2('password123', 256), 'Rahul Sharma', '9876543210'),
('explorer2', 'user2@example.com', SHA2('password123', 256), 'Priya Patel', '8765432109');

-- Insert Goa Bookings
INSERT INTO goa_bookings (user_id, package_type, travel_date, persons, contact_info) VALUES
(1, 'Gold', '2023-12-15', 2, 'rahul@example.com, 9876543210'),
(2, 'Platinum', '2024-01-20', 4, 'priya@example.com, 8765432109');

-- Insert Reviews
INSERT INTO reviews (user_id, destination_id, rating, title, comment, is_approved) VALUES
(1, 1, 5, 'Amazing Experience!', 'The beaches were pristine and the nightlife was fantastic!', TRUE),
(2, 2, 4, 'Beautiful Scenery', 'The landscapes took my breath away, though some areas were crowded', TRUE);

-- Insert Review Media
INSERT INTO review_media (review_id, media_url, media_type) VALUES
(1, 'images/reviews/goa1.jpg', 'image'),
(1, 'images/reviews/goa2.jpg', 'image'),
(2, 'images/reviews/kashmir1.jpg', 'image');

-- Insert Contact Submissions
INSERT INTO contact_submissions (name, email, subject, message) VALUES
('Amit Singh', 'amit@example.com', 'Group Booking', 'Looking to book for 10 people next month'),
('Neha Gupta', 'neha@example.com', 'Custom Package', 'Interested in a customized Goa package');
