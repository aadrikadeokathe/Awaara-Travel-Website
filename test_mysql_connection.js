const mysql = require('mysql2/promise');

async function test() {
  const config = {
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root',
    waitForConnections: true,
    connectionLimit: 1
  };

  try {
    const pool = mysql.createPool(config);
    const conn = await pool.getConnection();
    console.log('✅ Connected to MySQL server');
    
    const [dbs] = await conn.query('SHOW DATABASES');
    console.log('Available databases:', dbs.map(db => db.Database));
    
    conn.release();
    return true;
  } catch (err) {
    console.error('Connection failed:', err.message);
    return false;
  }
}

test();
