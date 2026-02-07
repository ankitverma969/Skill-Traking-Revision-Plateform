import mongoose from "mongoose";

const ConnectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log("DB Connect Successfull");
    }
    catch(error){
        console.error("Database connection failed..", error.message);
        process.exit(1);
    }
};

export default ConnectDB;