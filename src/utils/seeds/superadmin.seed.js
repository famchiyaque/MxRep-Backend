import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "#src/shared/models/actors/user.model.js";

export const seedSuperAdmin = async () => {
  try {
    const { User } = userModel;

    // Check if already exists
    const email = "cgonzalz@tec.mx";
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ Super admin already exists:", existingUser.email);
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash("admin", 10);

    // Create new super admin
    const superAdmin = new User({
      _id: new mongoose.Types.ObjectId(),
      institutionId: new mongoose.Types.ObjectId("69041695d6aebb0aebf33a24"),
      firstNames: "Carlos Alberto",
      lastNames: "González Almaguer",
      department: "R&EIT",
      email,
      passwordHash,
      role: "super-admin",
      isAdmin: true,
      needsToConfigurePass: true,
    });

    await superAdmin.save();
    console.log("🎉 Super admin created successfully!");
  } catch (error) {
    console.error("❌ Error seeding super admin:", error);
  }
};
