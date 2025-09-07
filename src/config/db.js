const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
// Falls back to local default if no URI is provided
async function connectDB(uri) {
	const mongoUri = uri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hackmate';
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
