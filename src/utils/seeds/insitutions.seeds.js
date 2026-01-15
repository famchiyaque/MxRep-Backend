import mongoose from "mongoose";
import institutionModel from "#src/shared/models/actors/institution.model.js"
import dotenv from "dotenv";
import { makeUri } from "../db/db.js";

dotenv.config();

const { Institution } = institutionModel;

const seedInstitutions = async () => {
  const institutions = [
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Tecnológico de Monterrey",
      country: "Mexico",
      city: "Monterrey",
      email: "contacto@tec.mx",
      domain: "tec.mx",
      slug: "tec-de-monterrey",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Harvard University",
      country: "United States",
      city: "Cambridge",
      email: "info@harvard.edu",
      domain: "harvard.edu",
      slug: "harvard-university",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "University of Tokyo",
      country: "Japan",
      city: "Tokyo",
      email: "contact@u-tokyo.ac.jp",
      domain: "u-tokyo.ac.jp",
      slug: "university-of-tokyo",
    },
  ];

  await Institution.insertMany(institutions);
  console.log("🏫 Institutions seeded successfully!");
};

const run = async () => {
  try {
    const uri = makeUri()
    if (!uri) throw new Error("MongoDB URI not found in environment variables.");

    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB Atlas");

    await seedInstitutions();
  } catch (error) {
    console.error("❌ Error seeding institutions:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

run();
