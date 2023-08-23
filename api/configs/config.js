const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://api_recruit:As4TapTe768DOS68@recruitment.mos8yva.mongodb.net/developer_exam?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();