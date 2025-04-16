-- Database Schema for Awaara Travel Website

-- Users table
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User logs table for tracking user actions
CREATE TABLE user_logs (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  action VARCHAR(50) NOT NULL,
  log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Destinations table
CREATE TABLE destinations (
  destination_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  destination_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(100) NOT NULL,
  comment TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (destination_id) REFERENCES destinations(destination_id)
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  contact_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15),
  subject VARCHAR(100),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Destination-specific booking tables
CREATE TABLE goa_bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  package_type VARCHAR(50) NOT NULL,
  travel_date DATE NOT NULL,
  persons INT NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE kashmir_bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  package_type VARCHAR(50) NOT NULL,
  travel_date DATE NOT NULL,
  persons INT NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE agra_bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  package_type VARCHAR(50) NOT NULL,
  travel_date DATE NOT NULL,
  persons INT NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  special_requests TEXT,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE mumbai_bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  package_type VARCHAR(50) NOT NULL,
  travel_date DATE NOT NULL,
  persons INT NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  special_requests TEXT,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE amritsar_bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  package_type VARCHAR(50) NOT NULL,
  travel_date DATE NOT NULL,
  persons INT NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  special_requests TEXT,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE rajasthan_bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  package_type VARCHAR(50) NOT NULL,
  travel_date DATE NOT NULL,
  persons INT NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  special_requests TEXT,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE hyderabad_bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  package_type VARCHAR(50) NOT NULL,
  travel_date DATE NOT NULL,
  persons INT NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  special_requests TEXT,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert initial destinations
INSERT INTO destinations (name, description, image_url) VALUES
('Goa', 'Beautiful beaches and vibrant nightlife', '/images/destinations/goa.jpg'),
('Jammu and Kashmir', 'Paradise on Earth with stunning landscapes', '/images/destinations/kashmir.jpg'),
('Agra', 'Home to the iconic Taj Mahal', '/images/destinations/agra.jpg'),
('Mumbai', 'The financial capital and entertainment hub', '/images/destinations/mumbai.jpg'),
('Amritsar', 'Home to the Golden Temple and rich culture', '/images/destinations/amritsar.jpg'),
('Rajasthan', 'Land of kings with majestic forts and palaces', '/images/destinations/rajasthan.jpg'),
('Hyderabad', 'City of Nizams with rich history and delicious cuisine', '/images/destinations/hyderabad.jpg');

-- Create admin user (password: admin123)
INSERT INTO users (full_name, email, password, phone, is_admin) VALUES
('Admin User', 'admin@awaaratravel.com', '$2a$12$kHza6fzMXYQFNXEcoZ7s8eZnz0X7SG9zNx6sMT4W4BJUu7hDysLOK', '9876543210', TRUE);