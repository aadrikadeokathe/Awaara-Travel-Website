
const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'root',
  database: 'awaara_travel',
  waitForConnections: true,
  connectionLimit: 10
};

const pool = mysql.createPool(config);

// Test database connection
async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('✅ Database connection successful');
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    return false;
  } finally {
    if (conn) conn.release();
  }
}

// Get all reviews
async function getReviews() {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query(
      `SELECT review_id, title as name, '' as email, 
       (SELECT destination_name FROM destinations WHERE destination_id = reviews.destination_id) as trip_name, 
       rating, comment as comments,
       DATE_FORMAT(review_date, '%M %d, %Y') as date 
       FROM reviews ORDER BY review_date DESC`
    );
    return rows;
  } catch (err) {
    console.error('Error fetching reviews:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

// Add new review
async function addReview(review) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.query(
      `INSERT INTO reviews 
       (title, rating, comment, destination_id)
       VALUES (?, ?, ?, 
         (SELECT destination_id FROM destinations WHERE destination_name = ?))`,
      [review.name, review.rating, review.comments, review.trip_name]
    );
    return result;
  } catch (err) {
    console.error('Error adding review:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  testConnection,
  getReviews,
  addReview,
  pool
};
