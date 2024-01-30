import mongoose from "mongoose";
import config from "../config/index";

//Database connection
const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.MONGO_URL).then((data) => {
      console.log(
        `🍀 Database is connected successfully with ${data.connection.name} ✉️ `
      );
    });
  } catch (error) {
    console.log("Database connectiom failed ", error);
    process.exit(1);
  }
};

export default connectToDB;
