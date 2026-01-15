import mongoose from "mongoose";

export const makeUri = () => {
  const user = process.env.MONGO_USER
  const password = process.env.MONGO_PASSWORD

  if (!user || !password) {
    throw new Error("Unable to make find user or pass for mongo uri");
  }

  const mongo_uri = `mongodb+srv://${user}:${password}@mxrep-testing.4hemv2z.mongodb.net/?appName=MxRep-Testing`

  return mongo_uri
}

export const connectDB = async () => {
  try {
    const mongo_uri = makeUri()

    mongoose.connect(mongo_uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
