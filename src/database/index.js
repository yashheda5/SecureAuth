import mongoose from "mongoose"

const connectToDB = async () => {
    const connectionUrl = "mongodb://localhost:27017/Auth";

    try {
        await mongoose.connect(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Auth database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

export default connectToDB;


// (mongodb+srv://yashheda5:392JAOBjnUSs9EvN@cluster0.bhoe6.mongodb.net/)