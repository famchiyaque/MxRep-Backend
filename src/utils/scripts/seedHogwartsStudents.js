/**
 * Seed Script: Create Hogwarts Students
 * 
 * This script creates 7 students for the Hogwarts institution
 * with pre-hashed passwords so they can log in immediately.
 * 
 * Usage:
 *   node src/utils/scripts/seedHogwartsStudents.js
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../../.env') });

// Import models
import userModel from '../../shared/models/user.model.js';
import institutionModel from '../../shared/models/institution.model.js';

const students = [
  {
    firstNames: "Harry",
    lastNames: "Potter",
    email: "h.potter@hogwarts.edu",
    department: "Gryffindor",
    password: "password123"
  },
  {
    firstNames: "Hermione",
    lastNames: "Granger",
    email: "h.granger@hogwarts.edu",
    department: "Gryffindor",
    password: "password123"
  },
  {
    firstNames: "Ron",
    lastNames: "Weasley",
    email: "r.weasley@hogwarts.edu",
    department: "Gryffindor",
    password: "password123"
  },
  {
    firstNames: "Draco",
    lastNames: "Malfoy",
    email: "d.malfoy@hogwarts.edu",
    department: "Slytherin",
    password: "password123"
  },
  {
    firstNames: "Luna",
    lastNames: "Lovegood",
    email: "l.lovegood@hogwarts.edu",
    department: "Ravenclaw",
    password: "password123"
  },
  {
    firstNames: "Cedric",
    lastNames: "Diggory",
    email: "c.diggory@hogwarts.edu",
    department: "Hufflepuff",
    password: "password123"
  },
  {
    firstNames: "Neville",
    lastNames: "Longbottom",
    email: "n.longbottom@hogwarts.edu",
    department: "Gryffindor",
    password: "password123"
  }
];

async function seedStudents() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    
    // Build MongoDB URI from environment variables
    const user = process.env.MONGO_USER;
    const password = process.env.MONGO_PASSWORD;
    
    if (!user || !password) {
      console.error('❌ Missing MONGO_USER or MONGO_PASSWORD in .env file');
      process.exit(1);
    }
    
    const mongoUri = `mongodb+srv://${user}:${password}@mxrep-testing.4hemv2z.mongodb.net/?appName=MxRep-Testing`;
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Find Hogwarts institution
    console.log('🔍 Looking for Hogwarts institution...');
    const hogwarts = await institutionModel.Institution.findOne({ 
      $or: [
        { name: "Hogwarts" },
        { domain: "hogwarts.edu" },
        { slug: "hogwarts" }
      ]
    });

    if (!hogwarts) {
      console.error('❌ Hogwarts institution not found!');
      console.log('Please create the Hogwarts institution first.');
      process.exit(1);
    }

    console.log(`✅ Found Hogwarts: ${hogwarts.name} (ID: ${hogwarts._id})\n`);

    // Hash password once (same for all students)
    console.log('🔐 Hashing passwords...');
    const passwordHash = await bcrypt.hash('password123', 10);
    console.log('✅ Password hashed\n');

    console.log('👥 Creating students...\n');
    
    let createdCount = 0;
    let skippedCount = 0;

    for (const student of students) {
      try {
        // Check if student already exists
        const existingStudent = await userModel.User.findOne({ email: student.email });
        
        if (existingStudent) {
          console.log(`⏭️  Skipped: ${student.firstNames} ${student.lastNames} (${student.email}) - already exists`);
          skippedCount++;
          continue;
        }

        // Create the student
        const newStudent = await userModel.User.create({
          institutionId: hogwarts._id,
          firstNames: student.firstNames,
          lastNames: student.lastNames,
          email: student.email,
          department: student.department,
          passwordHash: passwordHash,
          role: 'student',
          isAdmin: false,
          needsToConfigurePass: false // Already configured
        });

        console.log(`✅ Created: ${newStudent.firstNames} ${newStudent.lastNames} (${newStudent.email})`);
        createdCount++;
      } catch (error) {
        console.error(`❌ Error creating ${student.firstNames} ${student.lastNames}:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Students created: ${createdCount}`);
    console.log(`⏭️  Students skipped: ${skippedCount}`);
    console.log(`📧 Default password for all: password123`);
    console.log('='.repeat(60));

    if (createdCount > 0) {
      console.log('\n🎉 Students can now log in with their email and "password123"');
    }

  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedStudents();

