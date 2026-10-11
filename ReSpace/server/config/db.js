const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/respace';
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ Persistent MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: Could not connect to database at "${mongoUri}".`);
    console.error(`Reason: ${error.message}`);
    console.error(`👉 Please ensure that MongoDB server (mongod or MongoDB Service) is running locally or verify MONGO_URI in .env file.`);
    process.exit(1);
  }
};

module.exports = connectDB;
