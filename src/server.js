import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './db/connectDB.js';

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log('Db connected!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (_error) {
    process.exit(1);
  }
};

startServer();
