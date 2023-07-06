const mongoose = require('mongoose');



module.exports.connectToDb = async ()=> {
    console.log('Connecting to MongoDB');

    // db url from env
    const dbUrl = process.env?.DB_URL
    
    try {
        await mongoose.connect(`${dbUrl}Chatty`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
    }
}

// module.exports = connectToDb;
