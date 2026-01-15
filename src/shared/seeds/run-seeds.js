import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedSystemTemplates, clearSystemTemplates } from './system-templates.seed.js';
import { connectDB } from "#src/utils/db/db.js"

// Load environment variables
dotenv.config();

const runSeeds = async () => {
  try {
    console.log('🚀 Starting seed process...\n');

    connectDB();

    // Ask if user wants to clear existing system templates
    const args = process.argv.slice(2);
    const shouldClear = args.includes('--clear') || args.includes('-c');

    if (shouldClear) {
      await clearSystemTemplates();
      console.log('');
    }

    // Seed system templates
    await seedSystemTemplates();

    console.log('\n✨ Seed process completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Seed process failed:', error);
    process.exit(1);
  }
};

// Run the seeds
runSeeds();

