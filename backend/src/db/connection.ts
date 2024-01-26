import mongoose from "mongoose";
import config from "../config/index";

//Database connection
const connectToDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(config.MONGO_URL).then((data) => {
    console.log(
      `🍀 Database is connected successfully with ${data.connection.name} ✉️ `
    );
  });
};

export default connectToDB;
