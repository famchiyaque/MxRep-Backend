/**
 * Quick Password Reset Utility
 * Usage: node src/utils/scripts/resetPassword.js <email> <newPassword>
 */

import 'dotenv/config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import userModel from '../../shared/models/actors/user.model.js';
import { connectDB } from '../db/db.js';

const resetPassword = async (email, newPassword) => {
  try {
    console.log('\n🔐 Password Reset Utility');
    console.log('========================\n');

    // Connect to database
    await connectDB();

    // Find user
    const user = await userModel.User.findOne({ email });
    
    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      process.exit(1);
    }

    console.log(`✅ Found user: ${user.firstNames} ${user.lastNames}`);
    console.log(`   Institution ID: ${user.institutionId}`);
    console.log(`   Role: ${user.role}`);

    // Hash new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update user
    await userModel.User.updateOne(
      { _id: user._id },
      { 
        $set: { 
          passwordHash,
          needsToConfigurePass: false 
        } 
      }
    );

    console.log('\n✅ Password updated successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   New Password: ${newPassword}`);
    console.log('\n⚠️  Make sure to change this password after logging in!\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error resetting password:', error);
    process.exit(1);
  }
};

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('\n❌ Invalid usage!');
  console.log('\nUsage: node src/utils/scripts/resetPassword.js <email> <newPassword>');
  console.log('\nExample: node src/utils/scripts/resetPassword.js admin@hogwarts.edu NewPass123\n');
  process.exit(1);
}

const [email, newPassword] = args;

resetPassword(email, newPassword);

