# Game Creation & Management Workflow

## Overview
This document outlines the complete workflow for creating and managing games in the MxRep production line simulator.

---

## 1. System Setup (One-Time, by MxRep Admin)

### Create System-Level Templates
These are default templates available to all institutions:

```javascript
// Create default skills
const skills = await Skill.insertMany([
  { name: "Assembly", scope: "system", description: "Basic assembly skills" },
  { name: "Quality Control", scope: "system", description: "Inspection and QC" },
  { name: "Machine Operation", scope: "system", description: "Operating machinery" },
  // ... more skills
]);

// Create default jobs
const jobs = await Job.insertMany([
  { 
    name: "Assembly Worker", 
    scope: "system",
    baseSalary: 3000,
    skillsNeeded: [skills[0]._id]
  },
  // ... more jobs
]);

// Create default materials
const materials = await Material.insertMany([
  { name: "Steel Sheet", unitCost: 50, scope: "system", unit: "kg" },
  { name: "Plastic Component", unitCost: 10, scope: "system", unit: "unit" },
  // ... more materials
]);

// Create default asset templates
const assetTemplates = await AssetTemplate.insertMany([
  { 
    name: "CNC Machine", 
    type: "machinery",
    purchaseCost: 50000,
    scope: "system",
    capacity: 100
  },
  // ... more assets
]);

// Create default processes
const processes = await Process.insertMany([
  {
    name: "Cutting",
    scope: "system",
    durationMinutes: 15,
    requiredAssets: [assetTemplates[0]._id],
    requiredJobs: [{ job: jobs[0]._id, quantity: 1 }]
  },
  // ... more processes
]);

// Create default BOMs
const boms = await BOM.insertMany([
  {
    name: "Basic Widget",
    scope: "system",
    requiredMaterials: [
      { material: materials[0]._id, quantity: 2 },
      { material: materials[1]._id, quantity: 1 }
    ],
    processes: [processes[0]._id],
    productionTimeMinutes: 60,
    sellingPrice: 100
  },
  // ... more BOMs
]);
```

---

## 2. Professor Setup (Per Professor)

### Step 1: Professor Creates Custom Templates (Optional)

Professors can create institution or private templates:

```javascript
// Professor creates custom BOM for their class
const customBOM = await BOM.create({
  institutionId: professor.institutionId,
  professorId: professor._id,
  scope: "professor", // or "institution" to share
  name: "Advanced Widget",
  requiredMaterials: [
    { material: materials[0]._id, quantity: 5 },
    { material: materials[1]._id, quantity: 3 }
  ],
  processes: [processes[0]._id, processes[1]._id],
  productionTimeMinutes: 120,
  sellingPrice: 250
});

// Create custom employee template
const customEmployee = await EmployeeTemplate.create({
  institutionId: professor.institutionId,
  professorId: professor._id,
  scope: "professor",
  name: "Senior Assembly Worker",
  jobId: jobs[0]._id,
  baseEfficiency: 1.5,
  monthlySalary: 5000
});
```

### Step 2: Create Game Configuration

```javascript
// First, create premises config (economic settings)
const premisesConfig = await PremisesConfig.create({
  year: 2024,
  economics: {
    closingExchangeRate: 16.66,
    nationalPrimeRate: 0.16,
    // ... other settings
  },
  tax: {
    nationalInflation: 0.043,
    incomeTaxRate: 0.34,
    // ... other settings
  },
  policies: {
    inventoryPercentage: 0.2,
    // ... other settings
  }
});

// Create orders config (how orders arrive)
const ordersConfig = await OrdersConfig.create({
  ordersPerYear: 100000,
  ordersByMonth: {
    january: 0.08,
    february: 0.09,
    march: 0.09,
    // ... other months
  }
});

// Create game configuration
const gameConfig = await GameConfiguration.create({
  name: "Intro to Manufacturing - Spring 2024",
  description: "Basic production line simulation for beginners",
  
  // Financial settings
  initialCapital: 500000,
  gameDurationMonths: 12,
  
  // Reference configs
  premisesConfigId: premisesConfig._id,
  ordersConfigId: ordersConfig._id,
  
  // Available templates (mix of system and custom)
  availableBOMIds: [
    ...systemBOMs.map(b => b._id),
    customBOM._id
  ],
  availableEmployeeIds: [
    ...systemEmployees.map(e => e._id),
    customEmployee._id
  ],
  availableAssetIds: systemAssets.map(a => a._id),
  availableMaterialIds: systemMaterials.map(m => m._id),
  availableProcessIds: systemProcesses.map(p => p._id),
  availableExpenseIds: systemExpenses.map(e => e._id)
});
```

---

## 3. Game Creation (Per Class/Group)

### Step 1: Create the Game

```javascript
// Generate unique game code
function generateGameCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const game = await Game.create({
  institutionId: professor.institutionId,
  professorId: professor._id,
  groupId: group._id,
  
  name: "Manufacturing 101 - Section A",
  code: generateGameCode(), // e.g., "XY7K2M"
  description: "Spring 2024 simulation game",
  
  configurationId: gameConfig._id,
  
  status: "draft",
  startDate: new Date("2024-03-01"),
  endDate: new Date("2024-05-31")
});

console.log(`Game created! Students join with code: ${game.code}`);
```

### Step 2: Create Teams

```javascript
// Professor creates teams and assigns students
const team1 = await Team.create({
  gameId: game._id,
  name: "Team Alpha",
  studentIds: [student1._id, student2._id, student3._id]
});

const team2 = await Team.create({
  gameId: game._id,
  name: "Team Beta",
  studentIds: [student4._id, student5._id, student6._id]
});
```

### Step 3: Activate Game

```javascript
// When ready to start
await Game.findByIdAndUpdate(game._id, {
  status: "active",
  startDate: new Date()
});
```

---

## 4. Student Gameplay (Per Team)

### Step 1: Student Enters Game Code in Roblox

```javascript
// Roblox sends request to backend
POST /api/games/join
{
  "gameCode": "XY7K2M",
  "studentId": "student123"
}

// Backend verifies student is in a team for this game
// Returns game data + team's run (or creates run if first time)
```

### Step 2: Initialize Run (First Time Only)

```javascript
// When team first joins, create their Run
const run = await Run.create({
  teamId: team._id,
  gameId: game._id,
  configurationId: game.configurationId,
  
  // Initialize from configuration
  currentCapital: gameConfig.initialCapital, // e.g., 500000
  
  // Time simulation
  currentMonth: 1,
  currentDay: 1,
  simulationSpeed: 1,
  isPaused: false,
  
  // Empty arrays (team hasn't done anything yet)
  purchasedAssets: [],
  hiredEmployees: [],
  recurringExpenses: [],
  inventoryItems: [],
  activeOrders: [],
  completedOrders: [],
  productionBatches: [],
  transactions: [],
  lineIds: [],
  
  status: "in-progress"
});
```

### Step 3: Team Actions During Gameplay

#### Purchase Material
```javascript
// Student clicks "Buy 100 units of Steel Sheet"
const material = await Material.findById(materialId);
const quantity = 100;
const totalCost = material.unitCost * quantity;

// Check if team has enough money
if (run.currentCapital < totalCost) {
  throw new Error("Insufficient funds");
}

// Create or update inventory item
let inventoryItem = await InventoryItem.findOne({
  runId: run._id,
  materialId: material._id
});

if (inventoryItem) {
  // Update existing
  inventoryItem.quantity += quantity;
  inventoryItem.availableQuantity += quantity;
  inventoryItem.totalValue += totalCost;
  inventoryItem.averageUnitCost = inventoryItem.totalValue / inventoryItem.quantity;
  await inventoryItem.save();
} else {
  // Create new
  inventoryItem = await InventoryItem.create({
    runId: run._id,
    materialId: material._id,
    quantity: quantity,
    availableQuantity: quantity,
    averageUnitCost: material.unitCost,
    totalValue: totalCost
  });
}

// Record transaction
const transaction = await Transaction.create({
  runId: run._id,
  transactionNumber: `TXN-${Date.now()}`,
  type: "outflow",
  category: "material-purchase",
  amount: totalCost,
  description: `Purchased ${quantity} units of ${material.name}`,
  relatedInventoryItemId: inventoryItem._id,
  balanceBefore: run.currentCapital,
  balanceAfter: run.currentCapital - totalCost,
  transactionDate: new Date()
});

// Update run
run.currentCapital -= totalCost;
run.totalExpenses += totalCost;
run.inventoryItems.push(inventoryItem._id);
run.transactions.push(transaction._id);
await run.save();
```

#### Hire Employee
```javascript
// Student clicks "Hire Senior Assembly Worker"
const employeeTemplate = await EmployeeTemplate.findById(templateId);

const hiredEmployee = await HiredEmployee.create({
  runId: run._id,
  employeeTemplateId: employeeTemplate._id,
  jobId: employeeTemplate.jobId,
  employeeName: `${employeeTemplate.name} #${Date.now()}`,
  monthlySalary: employeeTemplate.monthlySalary,
  hiringCost: employeeTemplate.hiringCost,
  efficiency: employeeTemplate.baseEfficiency,
  hireDate: new Date(),
  status: "active"
});

// Record hiring cost transaction
const transaction = await Transaction.create({
  runId: run._id,
  transactionNumber: `TXN-${Date.now()}`,
  type: "outflow",
  category: "salary",
  amount: employeeTemplate.hiringCost,
  description: `Hired ${hiredEmployee.employeeName}`,
  relatedEmployeeId: hiredEmployee._id,
  balanceBefore: run.currentCapital,
  balanceAfter: run.currentCapital - employeeTemplate.hiringCost,
  transactionDate: new Date()
});

// Update run
run.currentCapital -= employeeTemplate.hiringCost;
run.totalExpenses += employeeTemplate.hiringCost;
run.hiredEmployees.push(hiredEmployee._id);
run.transactions.push(transaction._id);
await run.save();
```

#### Create Production Line
```javascript
// Student creates a line to produce "Basic Widget"
const bom = await BOM.findById(bomId).populate('processes');

// Create line
const line = await Line.create({
  runId: run._id,
  bomId: bom._id,
  name: "Production Line 1",
  lineNumber: 1,
  status: "idle",
  processStations: []
});

// Create process stations for each process in BOM
for (let i = 0; i < bom.processes.length; i++) {
  const process = bom.processes[i];
  
  const station = await ProcessStation.create({
    lineId: line._id,
    processTemplateId: process._id,
    stationName: `${process.name} Station`,
    stationNumber: i + 1,
    sequenceOrder: i,
    status: "idle",
    assignedAssets: [],
    assignedEmployees: []
  });
  
  line.processStations.push(station._id);
}

await line.save();

// Update run
run.lineIds.push(line._id);
await run.save();
```

#### Start Production
```javascript
// Student clicks "Start Production" for an order
const order = await Order.findById(orderId);
const line = await Line.findById(lineId);

// Check if line has required resources
// (validate assets, employees, materials available)

// Create production batch
const batch = await ProductionBatch.create({
  runId: run._id,
  orderId: order._id,
  lineId: line._id,
  bomId: order.bomId,
  batchNumber: `BATCH-${Date.now()}`,
  targetQuantity: order.quantity,
  status: "in-progress",
  scheduledStartTime: new Date(),
  processStages: line.processStations.map(stationId => ({
    processStationId: stationId,
    status: "pending"
  }))
});

// Update line and order
line.currentBatchId = batch._id;
line.status = "running";
await line.save();

order.status = "in-production";
await order.save();

// Update run
run.productionBatches.push(batch._id);
await run.save();
```

---

## 5. Time Simulation & Recurring Events

### Time Advancement (Backend Cron Job or Game Loop)

```javascript
// Every game "day" (could be real-time or turn-based)
async function advanceGameDay(runId) {
  const run = await Run.findById(runId)
    .populate('configurationId')
    .populate('activeOrders')
    .populate('hiredEmployees')
    .populate('recurringExpenses');
  
  // Advance day
  run.currentDay += 1;
  
  // Check if month ended
  if (run.currentDay > 30) {
    run.currentMonth += 1;
    run.currentDay = 1;
    
    // Monthly events
    await handleMonthlyEvents(run);
  }
  
  // Daily events
  await handleDailyEvents(run);
  
  await run.save();
}

async function handleMonthlyEvents(run) {
  // 1. Pay employee salaries
  for (const employee of run.hiredEmployees) {
    if (employee.status === "active") {
      const transaction = await Transaction.create({
        runId: run._id,
        type: "outflow",
        category: "salary",
        amount: employee.monthlySalary,
        description: `Monthly salary for ${employee.employeeName}`,
        relatedEmployeeId: employee._id,
        balanceBefore: run.currentCapital,
        balanceAfter: run.currentCapital - employee.monthlySalary,
        transactionDate: new Date()
      });
      
      run.currentCapital -= employee.monthlySalary;
      run.totalExpenses += employee.monthlySalary;
      employee.totalPaid += employee.monthlySalary;
      await employee.save();
    }
  }
  
  // 2. Pay recurring expenses
  for (const expense of run.recurringExpenses) {
    if (expense.status === "active" && expense.frequency === "monthly") {
      const transaction = await Transaction.create({
        runId: run._id,
        type: "outflow",
        category: "expense",
        amount: expense.amount,
        description: expense.name,
        relatedExpenseId: expense._id,
        balanceBefore: run.currentCapital,
        balanceAfter: run.currentCapital - expense.amount,
        transactionDate: new Date()
      });
      
      run.currentCapital -= expense.amount;
      run.totalExpenses += expense.amount;
      expense.totalPaid += expense.amount;
      expense.paymentCount += 1;
      await expense.save();
    }
  }
  
  // 3. Generate new orders based on OrdersConfig
  await generateMonthlyOrders(run);
  
  // 4. Calculate asset depreciation
  await calculateDepreciation(run);
}

async function handleDailyEvents(run) {
  // 1. Check for order due dates
  for (const order of run.activeOrders) {
    if (new Date() > order.dueDate && order.status !== "completed") {
      order.status = "late";
      // Apply late penalty
      order.latePenalty = order.totalValue * 0.1; // 10% penalty
      await order.save();
    }
  }
  
  // 2. Update production batches
  await updateProductionProgress(run);
}
```

---

## 6. Game Completion & Reporting

### End Game
```javascript
// When game duration ends or professor ends it
await Game.findByIdAndUpdate(gameId, {
  status: "completed",
  endDate: new Date()
});

// Mark all runs as completed
await Run.updateMany(
  { gameId: gameId },
  { status: "completed", endedAt: new Date() }
);
```

### Generate Reports
```javascript
// Calculate final scores
const runs = await Run.find({ gameId: gameId });

for (const run of runs) {
  // Calculate score based on:
  // - Final capital
  // - Orders completed on time
  // - Quality metrics
  // - Efficiency
  
  const score = calculateScore(run);
  run.score = score;
  await run.save();
}

// Generate leaderboard
const leaderboard = runs
  .sort((a, b) => b.score - a.score)
  .map((run, index) => ({
    rank: index + 1,
    teamId: run.teamId,
    score: run.score,
    finalCapital: run.currentCapital,
    ordersCompleted: run.completedOrders.length
  }));
```

---

## API Endpoints Summary

```
# Game Management
POST   /api/games                    # Create game
GET    /api/games/:id                # Get game details
PUT    /api/games/:id                # Update game
DELETE /api/games/:id                # Delete game
POST   /api/games/:id/activate       # Activate game
POST   /api/games/:id/complete       # End game

# Team Management
POST   /api/games/:gameId/teams      # Create team
GET    /api/games/:gameId/teams      # List teams
PUT    /api/teams/:id                # Update team
DELETE /api/teams/:id                # Delete team

# Gameplay
POST   /api/games/join               # Student joins game
GET    /api/runs/:id                 # Get run state
POST   /api/runs/:id/purchase-material
POST   /api/runs/:id/hire-employee
POST   /api/runs/:id/buy-asset
POST   /api/runs/:id/create-line
POST   /api/runs/:id/start-production
GET    /api/runs/:id/transactions    # Financial history
GET    /api/runs/:id/report          # Performance report

# Templates (Professor)
GET    /api/templates/boms           # Available BOMs
GET    /api/templates/employees      # Available employees
GET    /api/templates/assets         # Available assets
POST   /api/templates/boms           # Create custom BOM
# ... etc
```

---

## Summary

This workflow provides:
1. ✅ Clear separation between setup and gameplay
2. ✅ Reusable configurations
3. ✅ Multi-tenant security
4. ✅ Comprehensive tracking
5. ✅ Scalable architecture

The system supports everything from simple classroom simulations to complex, realistic production line scenarios.

