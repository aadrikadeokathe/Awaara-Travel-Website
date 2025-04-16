# SQL Queries for Awaara Travel Database

This document contains 40 SQL queries including joins, aggregations, and filters for the Awaara Travel database.

---

### 1. List all users with their email and phone:
```sql
SELECT user_id, full_name, email, phone FROM users;
```

### 2. Get all destinations with their popularity rating:
```sql
SELECT name, popularity_rating FROM destinations;
```

### 3. List all packages for Goa with price and duration:
```sql
SELECT p.package_type, p.price, p.duration
FROM packages p
JOIN destinations d ON p.destination_id = d.destination_id
WHERE d.name = 'Goa';
```

### 4. Get all bookings for user 'Rahul Sharma' across all destinations (union of bookings):
```sql
SELECT 'Goa' AS destination, booking_id, package_type, travel_date, persons
FROM goa_bookings gb
JOIN users u ON gb.user_id = u.user_id
WHERE u.full_name = 'Rahul Sharma'
UNION ALL
SELECT 'Kashmir', booking_id, package_type, travel_date, persons
FROM kashmir_bookings kb
JOIN users u ON kb.user_id = u.user_id
WHERE u.full_name = 'Rahul Sharma'
-- Repeat for other booking tables as needed
;
```

### 5. Get all reviews with user name and destination name:
```sql
SELECT r.review_id, u.full_name, d.name AS destination, r.rating, r.title, r.comment
FROM reviews r
JOIN users u ON r.user_id = u.user_id
JOIN destinations d ON r.destination_id = d.destination_id;
```

### 6. Count total bookings for Goa:
```sql
SELECT COUNT(*) AS total_goa_bookings FROM goa_bookings;
```

### 7. List all packages with destination name and price under 10000:
```sql
SELECT d.name AS destination, p.package_type, p.price
FROM packages p
JOIN destinations d ON p.destination_id = d.destination_id
WHERE p.price < 10000;
```

### 8. Get all users who have made bookings in Mumbai:
```sql
SELECT DISTINCT u.user_id, u.full_name, u.email
FROM mumbai_bookings mb
JOIN users u ON mb.user_id = u.user_id;
```

### 9. Get average rating per destination:
```sql
SELECT d.name, AVG(r.rating) AS avg_rating
FROM reviews r
JOIN destinations d ON r.destination_id = d.destination_id
GROUP BY d.name;
```

### 10. List all bookings for a specific date range in Rajasthan:
```sql
SELECT * FROM rajasthan_bookings
WHERE travel_date BETWEEN '2024-01-01' AND '2024-12-31';
```

### 11. Get all packages and their features for Hyderabad:
```sql
SELECT p.package_type, p.features
FROM packages p
JOIN destinations d ON p.destination_id = d.destination_id
WHERE d.name = 'Hyderabad';
```

### 12. Get all reviews approved and rated 5 stars:
```sql
SELECT * FROM reviews
WHERE is_approved = TRUE AND rating = 5;
```

### 13. Get all bookings with user contact info for Amritsar:
```sql
SELECT b.booking_id, u.full_name, b.contact_info, b.travel_date
FROM amritsar_bookings b
JOIN users u ON b.user_id = u.user_id;
```

### 14. Insert a new user:
```sql
INSERT INTO users (username, email, password_hash, full_name, phone)
VALUES ('newuser', 'newuser@example.com', SHA2('newpass', 256), 'New User', '1234567890');
```

### 15. Update package price for Goa Gold package:
```sql
UPDATE packages p
JOIN destinations d ON p.destination_id = d.destination_id
SET p.price = 9500
WHERE d.name = 'Goa' AND p.package_type = 'Gold';
```

### 16. Delete a review by review_id:
```sql
DELETE FROM reviews WHERE review_id = 10;
```

### 17. Get all contact submissions with subject containing 'booking':
```sql
SELECT * FROM contact_submissions
WHERE subject LIKE '%booking%';
```

### 18. List users who have not made any bookings (left join):
```sql
SELECT u.user_id, u.full_name
FROM users u
LEFT JOIN goa_bookings gb ON u.user_id = gb.user_id
LEFT JOIN kashmir_bookings kb ON u.user_id = kb.user_id
WHERE gb.user_id IS NULL AND kb.user_id IS NULL;
```

### 19. Get total persons booked per package type in Goa:
```sql
SELECT package_type, SUM(persons) AS total_persons
FROM goa_bookings
GROUP BY package_type;
```

### 20. Get all destinations with no packages (left join):
```sql
SELECT d.name
FROM destinations d
LEFT JOIN packages p ON d.destination_id = p.destination_id
WHERE p.package_id IS NULL;
```

### 21. Get all reviews with media URLs (assuming review_media table exists):
```sql
SELECT r.review_id, u.full_name, d.name, rm.media_url
FROM reviews r
JOIN users u ON r.user_id = u.user_id
JOIN destinations d ON r.destination_id = d.destination_id
JOIN review_media rm ON r.review_id = rm.review_id;
```

### 22. Get bookings count per destination (union all):
```sql
SELECT 'Goa' AS destination, COUNT(*) AS bookings_count FROM goa_bookings
UNION ALL
SELECT 'Kashmir', COUNT(*) FROM kashmir_bookings
UNION ALL
SELECT 'Agra', COUNT(*) FROM agra_bookings
UNION ALL
SELECT 'Mumbai', COUNT(*) FROM mumbai_bookings
UNION ALL
SELECT 'Amritsar', COUNT(*) FROM amritsar_bookings
UNION ALL
SELECT 'Rajasthan', COUNT(*) FROM rajasthan_bookings
UNION ALL
SELECT 'Hyderabad', COUNT(*) FROM hyderabad_bookings;
```

### 23. Get users with bookings and their total number of bookings:
```sql
SELECT u.user_id, u.full_name, COUNT(gb.booking_id) AS goa_bookings
FROM users u
LEFT JOIN goa_bookings gb ON u.user_id = gb.user_id
GROUP BY u.user_id;
```

### 24. Get all packages with destination and price sorted by price descending:
```sql
SELECT d.name, p.package_type, p.price
FROM packages p
JOIN destinations d ON p.destination_id = d.destination_id
ORDER BY p.price DESC;
```

### 25. Get all reviews for a user by username:
```sql
SELECT r.review_id, d.name, r.rating, r.comment
FROM reviews r
JOIN users u ON r.user_id = u.user_id
JOIN destinations d ON r.destination_id = d.destination_id
WHERE u.username = 'traveler1';
```

### 26. Get all bookings for a user with destination name (union all):
```sql
SELECT 'Goa' AS destination, gb.booking_id, gb.travel_date, gb.persons
FROM goa_bookings gb
JOIN users u ON gb.user_id = u.user_id
WHERE u.user_id = 1
UNION ALL
SELECT 'Kashmir', kb.booking_id, kb.travel_date, kb.persons
FROM kashmir_bookings kb
JOIN users u ON kb.user_id = u.user_id
WHERE u.user_id = 1;
```

### 27. Get destinations with average package price:
```sql
SELECT d.name, AVG(p.price) AS avg_price
FROM destinations d
JOIN packages p ON d.destination_id = p.destination_id
GROUP BY d.name;
```

### 28. Get all bookings with special requests not null:
```sql
SELECT * FROM agra_bookings WHERE special_requests IS NOT NULL
UNION ALL
SELECT * FROM mumbai_bookings WHERE special_requests IS NOT NULL;
```

### 29. Get all users registered in last 30 days:
```sql
SELECT * FROM users
WHERE registration_date >= CURDATE() - INTERVAL 30 DAY;
```

### 30. Get top 3 destinations by popularity rating:
```sql
SELECT name, popularity_rating
FROM destinations
ORDER BY popularity_rating DESC
LIMIT 3;
```

### 31. Get all bookings for a package type 'Platinum' across all destinations:
```sql
SELECT 'Goa' AS destination, booking_id, user_id, travel_date, persons
FROM goa_bookings WHERE package_type = 'Platinum'
UNION ALL
SELECT 'Kashmir', booking_id, user_id, travel_date, persons
FROM kashmir_bookings WHERE package_type = 'Platinum';
```

### 32. Get all reviews with rating >=4 and approved:
```sql
SELECT * FROM reviews
WHERE rating >= 4 AND is_approved = TRUE;
```

### 33. Get count of reviews per destination:
```sql
SELECT d.name, COUNT(r.review_id) AS review_count
FROM destinations d
LEFT JOIN reviews r ON d.destination_id = r.destination_id
GROUP BY d.name;
```

### 34. Get all bookings for a user with contact info:
```sql
SELECT u.full_name, b.contact_info, b.travel_date, b.package_type
FROM goa_bookings b
JOIN users u ON b.user_id = u.user_id
WHERE u.user_id = 2;
```

### 35. Get all packages with duration longer than 5 days:
```sql
SELECT * FROM packages
WHERE duration LIKE '%6N%' OR duration LIKE '%7N%';
```

### 36. Get all contact submissions in last 7 days:
```sql
SELECT * FROM contact_submissions
WHERE submission_date >= CURDATE() - INTERVAL 7 DAY;
```

### 37. Get users with more than 2 bookings in Goa:
```sql
SELECT u.user_id, u.full_name, COUNT(gb.booking_id) AS bookings_count
FROM users u
JOIN goa_bookings gb ON u.user_id = gb.user_id
GROUP BY u.user_id
HAVING bookings_count > 2;
```

### 38. Get all bookings sorted by booking date descending:
```sql
SELECT * FROM goa_bookings
ORDER BY booking_date DESC;
```

### 39. Get all packages with features containing 'Private tours':
```sql
SELECT * FROM packages
WHERE features LIKE '%Private tours%';
```

### 40. Get all users and their total number of reviews:
```sql
SELECT u.user_id, u.full_name, COUNT(r.review_id) AS total_reviews
FROM users u
LEFT JOIN reviews r ON u.user_id = r.user_id
GROUP BY u.user_id;
```

---

This document provides a comprehensive set of queries for managing and analyzing data in the Awaara Travel database.
