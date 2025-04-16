const db = require('./db');

async function testDatabase() {
  try {
    // 1. Test connection
    console.log('Testing database connection...');
    const isConnected = await db.testConnection();
    if (!isConnected) {
      console.error('Failed to connect to database');
      return;
    }
    console.log('✅ Database connection successful\n');

    // 2. Test getting reviews
    console.log('Fetching reviews...');
    const reviews = await db.getReviews();
    console.log(`Found ${reviews.length} reviews`);
    if (reviews.length > 0) {
      console.log('Sample review:', {
        name: reviews[0].name,
        rating: reviews[0].rating
      });
    }
    console.log('✅ Reviews fetched successfully\n');

    // 3. Test adding a review
    console.log('Adding test review...');
    const testReview = {
      name: 'Test User',
      email: 'test@example.com',
      trip_name: 'Test Trip',
      rating: 5,
      comments: 'This is a test review'
    };
    const result = await db.addReview(testReview);
    console.log('Added review with ID:', result.insertId);
    console.log('✅ Review added successfully\n');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    // Close connection pool
    await db.pool.end();
  }
}

testDatabase();
