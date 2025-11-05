import mongoose from 'mongoose';
import bomModel from '../../shared/models/games/templates/bom.model.js';
import employeeTemplateModel from '../../shared/models/games/templates/employee.model.js';
import assetTemplateModel from '../../shared/models/games/templates/asset.model.js';
import materialModel from '../../shared/models/games/templates/material.model.js';
import processModel from '../../shared/models/games/templates/process.model.js';
import expenseTemplateModel from '../../shared/models/games/templates/expense.model.js';
import jobModel from '../../shared/models/games/templates/job.model.js';
import skillModel from '../../shared/models/games/templates/skill.model.js';

/**
 * System-Level Templates Seed
 * These are universal templates available to all institutions
 * scope: "system", institutionId: null, professorId: null
 */

export const seedSystemTemplates = async () => {
  console.log('🌱 Starting system templates seed...');

  try {
    // ===== CLEAR EXISTING DATA =====
    console.log('🗑️  Clearing existing template data...');
    
    await Promise.all([
      skillModel.Skill.deleteMany({}),
      jobModel.Job.deleteMany({}),
      materialModel.Material.deleteMany({}),
      assetTemplateModel.AssetTemplate.deleteMany({}),
      processModel.Process.deleteMany({}),
      employeeTemplateModel.EmployeeTemplate.deleteMany({}),
      expenseTemplateModel.ExpenseTemplate.deleteMany({}),
      bomModel.BOM.deleteMany({})
    ]);
    
    console.log('✅ Cleared all template collections\n');

    // ===== SKILLS =====
    console.log('Creating skills...');
    const skills = await skillModel.Skill.insertMany([
      {
        name: "Assembly",
        description: "Basic assembly and construction skills",
        category: "technical",
        scope: "system"
      },
      {
        name: "Quality Control",
        description: "Inspection and quality assurance",
        category: "quality-control",
        scope: "system"
      },
      {
        name: "Machine Operation",
        description: "Operating and maintaining machinery",
        category: "technical",
        scope: "system"
      },
      {
        name: "Welding",
        description: "Metal welding and fabrication",
        category: "technical",
        scope: "system"
      },
      {
        name: "Electrical Work",
        description: "Electrical systems and wiring",
        category: "technical",
        scope: "system"
      },
      {
        name: "Forklift Operation",
        description: "Operating forklifts and material handling equipment",
        category: "technical",
        scope: "system"
      },
      {
        name: "Team Leadership",
        description: "Leading and managing teams",
        category: "management",
        scope: "system"
      },
      {
        name: "Inventory Management",
        description: "Managing stock and inventory systems",
        category: "management",
        scope: "system"
      }
    ]);
    console.log(`✅ Created ${skills.length} skills`);

    // ===== JOBS =====
    console.log('Creating jobs...');
    const jobs = await jobModel.Job.insertMany([
      {
        name: "Assembly Line Worker",
        jobTitle: "Assembly Worker",
        description: "Performs assembly tasks on production line",
        skillsNeeded: [skills[0]._id], // Assembly
        baseSalary: 3000,
        scope: "system"
      },
      {
        name: "Quality Inspector",
        jobTitle: "QC Inspector",
        description: "Inspects products for quality standards",
        skillsNeeded: [skills[1]._id], // Quality Control
        baseSalary: 3500,
        scope: "system"
      },
      {
        name: "Machine Operator",
        jobTitle: "Machine Operator",
        description: "Operates and maintains production machinery",
        skillsNeeded: [skills[2]._id], // Machine Operation
        baseSalary: 4000,
        scope: "system"
      },
      {
        name: "Welder",
        jobTitle: "Welder",
        description: "Performs welding operations",
        skillsNeeded: [skills[3]._id], // Welding
        baseSalary: 4500,
        scope: "system"
      },
      {
        name: "Electrician",
        jobTitle: "Electrician",
        description: "Handles electrical work and maintenance",
        skillsNeeded: [skills[4]._id], // Electrical Work
        baseSalary: 5000,
        scope: "system"
      },
      {
        name: "Warehouse Worker",
        jobTitle: "Warehouse Operator",
        description: "Manages warehouse operations and material handling",
        skillsNeeded: [skills[5]._id, skills[7]._id], // Forklift, Inventory
        baseSalary: 3200,
        scope: "system"
      },
      {
        name: "Production Supervisor",
        jobTitle: "Supervisor",
        description: "Supervises production line operations",
        skillsNeeded: [skills[6]._id, skills[0]._id], // Leadership, Assembly
        baseSalary: 6000,
        scope: "system"
      }
    ]);
    console.log(`✅ Created ${jobs.length} jobs`);

    // ===== MATERIALS =====
    console.log('Creating materials...');
    const materials = await materialModel.Material.insertMany([
      {
        name: "Steel Sheet",
        description: "Cold-rolled steel sheets for manufacturing",
        unit: "kg",
        unitCost: 50,
        leadTimeDays: 3,
        minimumOrderQuantity: 100,
        supplier: "Steel Corp",
        scope: "system"
      },
      {
        name: "Aluminum Sheet",
        description: "Lightweight aluminum sheets",
        unit: "kg",
        unitCost: 75,
        leadTimeDays: 3,
        minimumOrderQuantity: 50,
        supplier: "Metal Suppliers Inc",
        scope: "system"
      },
      {
        name: "Plastic Pellets",
        description: "Raw plastic pellets for molding",
        unit: "kg",
        unitCost: 20,
        leadTimeDays: 2,
        minimumOrderQuantity: 200,
        supplier: "Plastics Co",
        scope: "system"
      },
      {
        name: "Bolts (M8)",
        description: "Standard M8 bolts",
        unit: "unit",
        unitCost: 0.5,
        leadTimeDays: 1,
        minimumOrderQuantity: 1000,
        supplier: "Hardware Supply",
        scope: "system"
      },
      {
        name: "Nuts (M8)",
        description: "Standard M8 nuts",
        unit: "unit",
        unitCost: 0.3,
        leadTimeDays: 1,
        minimumOrderQuantity: 1000,
        supplier: "Hardware Supply",
        scope: "system"
      },
      {
        name: "Washers",
        description: "Standard washers",
        unit: "unit",
        unitCost: 0.1,
        leadTimeDays: 1,
        minimumOrderQuantity: 2000,
        supplier: "Hardware Supply",
        scope: "system"
      },
      {
        name: "Paint (Black)",
        description: "Industrial black paint",
        unit: "liter",
        unitCost: 30,
        leadTimeDays: 2,
        minimumOrderQuantity: 10,
        supplier: "Paint Pro",
        scope: "system"
      },
      {
        name: "Rubber Gasket",
        description: "Rubber gaskets for sealing",
        unit: "unit",
        unitCost: 2,
        leadTimeDays: 2,
        minimumOrderQuantity: 500,
        supplier: "Rubber Works",
        scope: "system"
      },
      {
        name: "Circuit Board",
        description: "Basic circuit board",
        unit: "unit",
        unitCost: 15,
        leadTimeDays: 5,
        minimumOrderQuantity: 100,
        supplier: "Electronics Ltd",
        scope: "system"
      },
      {
        name: "Wiring Harness",
        description: "Pre-assembled wiring harness",
        unit: "unit",
        unitCost: 25,
        leadTimeDays: 4,
        minimumOrderQuantity: 50,
        supplier: "Electronics Ltd",
        scope: "system"
      }
    ]);
    console.log(`✅ Created ${materials.length} materials`);

    // ===== ASSET TEMPLATES =====
    console.log('Creating asset templates...');
    const assets = await assetTemplateModel.AssetTemplate.insertMany([
      {
        name: "CNC Machine",
        description: "Computer Numerical Control machine for precision cutting",
        type: "machinery",
        purchaseCost: 50000,
        maintenanceCostPerMonth: 500,
        salvageValue: 10000,
        usefulLifeYears: 10,
        capacity: 100,
        efficiency: 1.0,
        scope: "system"
      },
      {
        name: "Assembly Station",
        description: "Manual assembly workstation",
        type: "equipment",
        purchaseCost: 5000,
        maintenanceCostPerMonth: 50,
        salvageValue: 1000,
        usefulLifeYears: 10,
        capacity: 50,
        efficiency: 1.0,
        scope: "system"
      },
      {
        name: "Welding Machine",
        description: "Industrial welding equipment",
        type: "machinery",
        purchaseCost: 15000,
        maintenanceCostPerMonth: 200,
        salvageValue: 3000,
        usefulLifeYears: 10,
        capacity: 80,
        efficiency: 1.0,
        scope: "system"
      },
      {
        name: "Paint Booth",
        description: "Industrial paint booth with ventilation",
        type: "equipment",
        purchaseCost: 25000,
        maintenanceCostPerMonth: 300,
        salvageValue: 5000,
        usefulLifeYears: 15,
        capacity: 60,
        efficiency: 1.0,
        scope: "system"
      },
      {
        name: "Quality Testing Station",
        description: "Equipment for quality control testing",
        type: "equipment",
        purchaseCost: 10000,
        maintenanceCostPerMonth: 100,
        salvageValue: 2000,
        usefulLifeYears: 10,
        capacity: 40,
        efficiency: 1.0,
        scope: "system"
      },
      {
        name: "Forklift",
        description: "Electric forklift for material handling",
        type: "transportation",
        purchaseCost: 20000,
        maintenanceCostPerMonth: 250,
        salvageValue: 4000,
        usefulLifeYears: 8,
        capacity: 200,
        efficiency: 1.0,
        scope: "system"
      },
      {
        name: "Conveyor Belt System",
        description: "Automated conveyor system",
        type: "machinery",
        purchaseCost: 30000,
        maintenanceCostPerMonth: 400,
        salvageValue: 6000,
        usefulLifeYears: 12,
        capacity: 150,
        efficiency: 1.0,
        scope: "system"
      },
      {
        name: "Computer Workstation",
        description: "Desktop computer for office work",
        type: "technology",
        purchaseCost: 1500,
        maintenanceCostPerMonth: 20,
        salvageValue: 200,
        usefulLifeYears: 5,
        capacity: 10,
        efficiency: 1.0,
        scope: "system"
      }
    ]);
    console.log(`✅ Created ${assets.length} asset templates`);

    // ===== PROCESSES =====
    console.log('Creating processes...');
    const processes = await processModel.Process.insertMany([
      {
        name: "Cutting",
        description: "Cut materials to size using CNC machine",
        sequenceOrder: 1,
        requiredAssets: [assets[0]._id], // CNC Machine
        requiredJobs: [{ job: jobs[2]._id, quantity: 1 }], // Machine Operator
        durationMinutes: 30,
        setupTimeMinutes: 15,
        operatingCostPerRun: 50,
        scope: "system"
      },
      {
        name: "Welding",
        description: "Weld metal components together",
        sequenceOrder: 2,
        requiredAssets: [assets[2]._id], // Welding Machine
        requiredJobs: [{ job: jobs[3]._id, quantity: 1 }], // Welder
        durationMinutes: 45,
        setupTimeMinutes: 10,
        operatingCostPerRun: 40,
        scope: "system"
      },
      {
        name: "Assembly",
        description: "Assemble components into final product",
        sequenceOrder: 3,
        requiredAssets: [assets[1]._id], // Assembly Station
        requiredJobs: [{ job: jobs[0]._id, quantity: 2 }], // Assembly Workers
        durationMinutes: 60,
        setupTimeMinutes: 5,
        operatingCostPerRun: 30,
        scope: "system"
      },
      {
        name: "Painting",
        description: "Apply paint finish to product",
        sequenceOrder: 4,
        requiredAssets: [assets[3]._id], // Paint Booth
        requiredJobs: [{ job: jobs[0]._id, quantity: 1 }], // Assembly Worker
        durationMinutes: 40,
        setupTimeMinutes: 20,
        operatingCostPerRun: 35,
        scope: "system"
      },
      {
        name: "Quality Inspection",
        description: "Inspect product for quality standards",
        sequenceOrder: 5,
        requiredAssets: [assets[4]._id], // Quality Testing Station
        requiredJobs: [{ job: jobs[1]._id, quantity: 1 }], // QC Inspector
        durationMinutes: 20,
        setupTimeMinutes: 5,
        operatingCostPerRun: 20,
        scope: "system"
      },
      {
        name: "Packaging",
        description: "Package finished product for shipping",
        sequenceOrder: 6,
        requiredAssets: [assets[1]._id], // Assembly Station
        requiredJobs: [{ job: jobs[5]._id, quantity: 1 }], // Warehouse Worker
        durationMinutes: 15,
        setupTimeMinutes: 5,
        operatingCostPerRun: 15,
        scope: "system"
      }
    ]);
    console.log(`✅ Created ${processes.length} processes`);

    // ===== EMPLOYEE TEMPLATES =====
    console.log('Creating employee templates...');
    const employees = await employeeTemplateModel.EmployeeTemplate.insertMany([
      {
        name: "Junior Assembly Worker",
        description: "Entry-level assembly worker",
        jobId: jobs[0]._id,
        skills: [skills[0]._id],
        baseEfficiency: 0.8,
        monthlySalary: 3000,
        hiringCost: 500,
        scope: "system"
      },
      {
        name: "Senior Assembly Worker",
        description: "Experienced assembly worker",
        jobId: jobs[0]._id,
        skills: [skills[0]._id],
        baseEfficiency: 1.2,
        monthlySalary: 4000,
        hiringCost: 800,
        scope: "system"
      },
      {
        name: "Quality Inspector",
        description: "Quality control specialist",
        jobId: jobs[1]._id,
        skills: [skills[1]._id],
        baseEfficiency: 1.0,
        monthlySalary: 3500,
        hiringCost: 600,
        scope: "system"
      },
      {
        name: "CNC Operator",
        description: "Skilled CNC machine operator",
        jobId: jobs[2]._id,
        skills: [skills[2]._id],
        baseEfficiency: 1.0,
        monthlySalary: 4000,
        hiringCost: 700,
        scope: "system"
      },
      {
        name: "Certified Welder",
        description: "Certified welding specialist",
        jobId: jobs[3]._id,
        skills: [skills[3]._id],
        baseEfficiency: 1.0,
        monthlySalary: 4500,
        hiringCost: 800,
        scope: "system"
      },
      {
        name: "Licensed Electrician",
        description: "Licensed electrical technician",
        jobId: jobs[4]._id,
        skills: [skills[4]._id],
        baseEfficiency: 1.0,
        monthlySalary: 5000,
        hiringCost: 1000,
        scope: "system"
      },
      {
        name: "Warehouse Operator",
        description: "Warehouse and logistics worker",
        jobId: jobs[5]._id,
        skills: [skills[5]._id, skills[7]._id],
        baseEfficiency: 1.0,
        monthlySalary: 3200,
        hiringCost: 500,
        scope: "system"
      },
      {
        name: "Production Supervisor",
        description: "Experienced production line supervisor",
        jobId: jobs[6]._id,
        skills: [skills[6]._id, skills[0]._id],
        baseEfficiency: 1.3,
        monthlySalary: 6000,
        hiringCost: 1200,
        scope: "system"
      }
    ]);
    console.log(`✅ Created ${employees.length} employee templates`);

    // ===== EXPENSE TEMPLATES =====
    console.log('Creating expense templates...');
    const expenses = await expenseTemplateModel.ExpenseTemplate.insertMany([
      {
        name: "Electricity",
        description: "Monthly electricity bill",
        category: "utilities",
        type: "fixed",
        amount: 2000,
        frequency: "monthly",
        scope: "system"
      },
      {
        name: "Water",
        description: "Monthly water bill",
        category: "utilities",
        type: "fixed",
        amount: 500,
        frequency: "monthly",
        scope: "system"
      },
      {
        name: "Natural Gas",
        description: "Monthly gas bill",
        category: "utilities",
        type: "fixed",
        amount: 800,
        frequency: "monthly",
        scope: "system"
      },
      {
        name: "Internet & Phone",
        description: "Monthly telecommunications",
        category: "utilities",
        type: "fixed",
        amount: 300,
        frequency: "monthly",
        scope: "system"
      },
      {
        name: "Facility Rent",
        description: "Monthly facility rental",
        category: "rent",
        type: "fixed",
        amount: 10000,
        frequency: "monthly",
        scope: "system"
      },
      {
        name: "Property Insurance",
        description: "Annual property insurance",
        category: "insurance",
        type: "fixed",
        amount: 12000,
        frequency: "yearly",
        scope: "system"
      },
      {
        name: "Liability Insurance",
        description: "Annual liability insurance",
        category: "insurance",
        type: "fixed",
        amount: 8000,
        frequency: "yearly",
        scope: "system"
      },
      {
        name: "Marketing & Advertising",
        description: "Monthly marketing expenses",
        category: "marketing",
        type: "variable",
        amount: 1500,
        frequency: "monthly",
        scope: "system"
      },
      {
        name: "Office Supplies",
        description: "Monthly office supplies",
        category: "supplies",
        type: "variable",
        amount: 400,
        frequency: "monthly",
        scope: "system"
      },
      {
        name: "Safety Equipment",
        description: "Quarterly safety equipment purchase",
        category: "supplies",
        type: "fixed",
        amount: 2000,
        frequency: "quarterly",
        scope: "system"
      }
    ]);
    console.log(`✅ Created ${expenses.length} expense templates`);

    // ===== BOMS (Bill of Materials) =====
    console.log('Creating BOMs...');
    const boms = await bomModel.BOM.insertMany([
      {
        name: "Basic Widget",
        description: "Simple manufactured widget",
        requiredMaterials: [
          { material: materials[0]._id, quantity: 2 }, // Steel Sheet
          { material: materials[3]._id, quantity: 4 }, // Bolts
          { material: materials[4]._id, quantity: 4 }, // Nuts
          { material: materials[5]._id, quantity: 4 }, // Washers
        ],
        processes: [processes[0]._id, processes[2]._id, processes[4]._id, processes[5]._id],
        productionTimeMinutes: 125, // Sum of process durations
        sellingPrice: 100,
        scope: "system"
      },
      {
        name: "Metal Frame",
        description: "Welded metal frame structure",
        requiredMaterials: [
          { material: materials[0]._id, quantity: 5 }, // Steel Sheet
          { material: materials[1]._id, quantity: 2 }, // Aluminum Sheet
          { material: materials[3]._id, quantity: 8 }, // Bolts
          { material: materials[4]._id, quantity: 8 }, // Nuts
        ],
        processes: [processes[0]._id, processes[1]._id, processes[4]._id, processes[5]._id],
        productionTimeMinutes: 135,
        sellingPrice: 250,
        scope: "system"
      },
      {
        name: "Painted Component",
        description: "Painted metal component",
        requiredMaterials: [
          { material: materials[0]._id, quantity: 3 }, // Steel Sheet
          { material: materials[6]._id, quantity: 1 }, // Paint (1 liter)
          { material: materials[3]._id, quantity: 6 }, // Bolts
        ],
        processes: [processes[0]._id, processes[2]._id, processes[3]._id, processes[4]._id, processes[5]._id],
        productionTimeMinutes: 165,
        sellingPrice: 180,
        scope: "system"
      },
      {
        name: "Electronic Assembly",
        description: "Basic electronic product",
        requiredMaterials: [
          { material: materials[2]._id, quantity: 1 }, // Plastic Pellets
          { material: materials[8]._id, quantity: 1 }, // Circuit Board
          { material: materials[9]._id, quantity: 1 }, // Wiring Harness
          { material: materials[3]._id, quantity: 4 }, // Bolts
        ],
        processes: [processes[2]._id, processes[4]._id, processes[5]._id],
        productionTimeMinutes: 95,
        sellingPrice: 150,
        scope: "system"
      },
      {
        name: "Premium Widget",
        description: "High-quality widget with all processes",
        requiredMaterials: [
          { material: materials[0]._id, quantity: 3 }, // Steel Sheet
          { material: materials[1]._id, quantity: 1 }, // Aluminum Sheet
          { material: materials[6]._id, quantity: 1 }, // Paint (1 liter)
          { material: materials[7]._id, quantity: 2 }, // Rubber Gasket
          { material: materials[3]._id, quantity: 8 }, // Bolts
          { material: materials[4]._id, quantity: 8 }, // Nuts
          { material: materials[5]._id, quantity: 8 }, // Washers
        ],
        processes: [processes[0]._id, processes[1]._id, processes[2]._id, processes[3]._id, processes[4]._id, processes[5]._id],
        productionTimeMinutes: 210,
        sellingPrice: 350,
        scope: "system"
      }
    ]);
    console.log(`✅ Created ${boms.length} BOMs`);

    console.log('\n🎉 System templates seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${skills.length} Skills`);
    console.log(`   - ${jobs.length} Jobs`);
    console.log(`   - ${materials.length} Materials`);
    console.log(`   - ${assets.length} Asset Templates`);
    console.log(`   - ${processes.length} Processes`);
    console.log(`   - ${employees.length} Employee Templates`);
    console.log(`   - ${expenses.length} Expense Templates`);
    console.log(`   - ${boms.length} BOMs`);
    console.log(`\n✅ All templates are scope: "system" (universal)`);

    return {
      skills,
      jobs,
      materials,
      assets,
      processes,
      employees,
      expenses,
      boms
    };

  } catch (error) {
    console.error('❌ Error seeding system templates:', error);
    throw error;
  }
};

// Optional: Clear existing system templates
export const clearSystemTemplates = async () => {
  console.log('🗑️  Clearing existing system templates...');
  
  try {
    await Promise.all([
      bomModel.BOM.deleteMany({ scope: "system" }),
      employeeTemplateModel.EmployeeTemplate.deleteMany({ scope: "system" }),
      assetTemplateModel.AssetTemplate.deleteMany({ scope: "system" }),
      materialModel.Material.deleteMany({ scope: "system" }),
      processModel.Process.deleteMany({ scope: "system" }),
      expenseTemplateModel.ExpenseTemplate.deleteMany({ scope: "system" }),
      jobModel.Job.deleteMany({ scope: "system" }),
      skillModel.Skill.deleteMany({ scope: "system" })
    ]);
    
    console.log('✅ System templates cleared');
  } catch (error) {
    console.error('❌ Error clearing system templates:', error);
    throw error;
  }
};

export default { seedSystemTemplates, clearSystemTemplates };

