const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'awaara_travel',
  waitForConnections: true,
  connectionLimit: 10
};

const pool = mysql.createPool(config);

// Add new booking
async function addBooking(booking) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.query(
      `INSERT INTO bookings 
       (name, email, phone, package, travelers, date, special_requests)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        booking.name,
        booking.email, 
        booking.phone,
        booking.package,
        booking.travelers,
        booking.date,
        booking.special_requests
      ]
    );
    return result;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  addBooking
};
