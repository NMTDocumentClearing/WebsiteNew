
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("BASE-URL:",process.env.FRONT_END_URL);
        console.log('MONGO_URL:', process.env.MONGO_URL);  // Debug log
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


module.exports = connectDB