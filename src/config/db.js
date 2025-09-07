const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
// In production, do NOT fall back to localhost; require an explicit URI.
async function connectDB(uri) {
	const mongoUri = uri
		|| process.env.MONGO_URI
		|| process.env.MONGODB_URI
		|| process.env.MONGO_URL
		|| '';
	if (!mongoUri) {
		console.warn('[db] No MongoDB URI configured (MONGO_URI/MONGODB_URI/MONGO_URL). Skipping DB connection.');
		return null;
	}
	try {
		await mongoose.connect(mongoUri);
		console.log('MongoDB connected');
		return mongoose.connection;
	} catch (err) {
		console.error('MongoDB connection error:', err.message);
		// Do not crash the server immediately; allow /api/health to report DB status
		// but set a non-zero exit code for awareness if running in CI
		process.exitCode = 1;
		return null;
	}
}

module.exports = { connectDB };
