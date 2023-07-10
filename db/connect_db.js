const mongoose = require('mongoose');

const uri = process.env.URI;

const connectToDatabase = async () => {

  try {
    console.log('Connected to the DB');

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas', error);
  }
}

connectToDatabase();


