const mongoose = require("mongoose");
const { User } = require("../infrastructure/models/user.model");

const seedUsers = async () => {
    const users = [
        {
            email: "john.doe@example.com",
            firstNames: "John",
            lastNames: "Doe",
            passwordHash: "hashedpassword1",
            role: "student"
        },
        {
            email: "jane.smith@example.com",
            firstNames: "Jane",
            lastNames: "Smith",
            passwordHash: "hashedpassword2",
            role: "professor"
        },
        {
            email: "admin@example.com",
            firstNames: "Admin",
            lastNames: "User",
            passwordHash: "hashedpassword3",
            role: "admin"
        }
    ];

    await User.insertMany(users);
    console.log("Users seeded successfully!");
};

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await seedUsers();
    } catch (error) {
        console.error("Error seeding users:", error);
    } finally {
        mongoose.connection.close();
    }
};

run();