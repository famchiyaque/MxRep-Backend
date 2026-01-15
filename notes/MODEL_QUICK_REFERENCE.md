# MxRep Models - Quick Reference Card

## Model Categories

### 🏢 System Management (`/models/actors/`, `/models/groups/`)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Institution` | Universities/Schools | name, domain, slug |
| `User` | Professors & Students | email, role, institutionId |
| `Class` | Course/Class | institutionId, professorId |
| `Group` | Students in a class | classId, members[] |
| `Team` | Students playing together | gameId, studentIds[] |

### 🎮 Game Core (`/models/games/`)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Game` | A game instance | code, configurationId, groupId, status |
| `GameConfiguration` | Game rules & settings | initialCapital, gameDurationMonths, available*Ids[] |
| `Run` | Team's game state | teamId, currentCapital, currentMonth, status |
| `Line` | Production line | runId, bomId, processStations[], status |

### ⚙️ Configuration (`/models/games/config/`)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `OrdersConfig` | Order distribution | ordersPerYear, ordersByMonth{} |
| `PremisesConfig` | Economic settings | economics{}, tax{}, policies{} |

### 📋 Templates (`/models/games/templates/`)
*What can be used in games*

| Model | Purpose | Key Fields | Multi-tenant |
|-------|---------|------------|--------------|
| `BOM` | Product definition | name, requiredMaterials[], processes[], sellingPrice | ✅ |
| `EmployeeTemplate` | Employee type | name, jobId, baseEfficiency, monthlySalary | ✅ |
| `Job` | Job definition | name, skillsNeeded[], baseSalary | ✅ |
| `Skill` | Skill definition | name, description, category | ✅ |
| `AssetTemplate` | Asset type | name, type, purchaseCost, capacity | ✅ |
| `Material` | Material definition | name, unitCost, leadTimeDays | ✅ |
| `Process` | Process definition | name, durationMinutes, requiredAssets[], requiredJobs[] | ✅ |
| `ExpenseTemplate` | Expense type | name, amount, frequency | ✅ |

### 🎯 Runtime Instances (`/models/games/runtime/`)
*What teams own/do during gameplay*

| Model | Purpose | Key Fields | Links To |
|-------|---------|------------|----------|
| `Order` | Customer order | runId, bomId, quantity, dueDate, status | BOM |
| `InventoryItem` | Material in stock | runId, materialId, quantity, averageUnitCost | Material |
| `PurchasedAsset` | Owned asset | runId, assetTemplateId, purchasePrice, status | AssetTemplate |
| `HiredEmployee` | Hired employee | runId, employeeTemplateId, monthlySalary, status | EmployeeTemplate |
| `RecurringExpense` | Active expense | runId, expenseTemplateId, amount, frequency | ExpenseTemplate |
| `ProcessStation` | Process in line | lineId, processTemplateId, assignedAssets[], assignedEmployees[] | Process |
| `ProductionBatch` | Production run | runId, orderId, lineId, targetQuantity, status | Order, Line |
| `Transaction` | Financial record | runId, type, category, amount, balanceBefore/After | Various |

---

## Multi-Tenancy Fields

All template models include:
```javascript
{
  institutionId: ObjectId,  // Institution owner
  professorId: ObjectId,    // Professor owner
  scope: String             // "system" | "institution" | "professor"
}
```

**Scope Meanings:**
- `system` - MxRep default, visible to all
- `institution` - Shared within institution
- `professor` - Private to professor

---

## Key Relationships

### Game Hierarchy
```
Institution
  └─ User (Professor)
      └─ Class
          └─ Group
              └─ Game
                  ├─ GameConfiguration
                  │   ├─ OrdersConfig
                  │   ├─ PremisesConfig
                  │   └─ Available Templates[]
                  └─ Team
                      └─ Run
                          ├─ Lines[]
                          ├─ Orders[]
                          ├─ Inventory[]
                          ├─ Assets[]
                          ├─ Employees[]
                          └─ Transactions[]
```

### Production Flow
```
BOM (Product)
  ├─ requiredMaterials[] → Material
  └─ processes[] → Process
      ├─ requiredAssets[] → AssetTemplate
      └─ requiredJobs[] → Job
          └─ skillsNeeded[] → Skill

Line (Production Line)
  ├─ bomId → BOM (what it produces)
  └─ processStations[] → ProcessStation
      ├─ processTemplateId → Process
      ├─ assignedAssets[] → PurchasedAsset
      └─ assignedEmployees[] → HiredEmployee

ProductionBatch (Actual Production)
  ├─ orderId → Order (why we're making it)
  ├─ lineId → Line (where we're making it)
  ├─ bomId → BOM (what we're making)
  └─ processStages[] → ProcessStation (progress)
```

### Financial Tracking
```
Transaction
  ├─ type: "inflow" | "outflow"
  ├─ category: "sales-revenue" | "material-purchase" | "salary" | etc.
  ├─ amount: Number
  ├─ balanceBefore: Number
  ├─ balanceAfter: Number
  └─ related*Id: ObjectId (links to source)

Categories:
  Inflows: sales-revenue, loan, investment, asset-sale, other-income
  Outflows: material-purchase, asset-purchase, salary, expense, 
            loan-payment, tax, other-expense
```

---

## Common Queries

### Get all available templates for a game
```javascript
const config = await GameConfiguration.findById(configId)
  .populate('availableBOMIds')
  .populate('availableEmployeeIds')
  .populate('availableAssetIds')
  .populate('availableMaterialIds')
  .populate('availableProcessIds')
  .populate('availableExpenseIds');
```

### Get team's current game state
```javascript
const run = await Run.findById(runId)
  .populate('hiredEmployees')
  .populate('purchasedAssets')
  .populate('inventoryItems')
  .populate('activeOrders')
  .populate('lineIds')
  .populate({
    path: 'lineIds',
    populate: { path: 'processStations' }
  });
```

### Get professor's custom templates
```javascript
const customBOMs = await BOM.find({
  professorId: professorId,
  scope: "professor"
});
```

### Get institution-wide templates
```javascript
const institutionTemplates = await BOM.find({
  $or: [
    { scope: "system" },
    { institutionId: institutionId, scope: "institution" }
  ]
});
```

### Get team's financial history
```javascript
const transactions = await Transaction.find({ runId: runId })
  .sort({ transactionDate: -1 })
  .limit(100);

// Calculate totals
const totalRevenue = await Transaction.aggregate([
  { $match: { runId: runId, type: "inflow" } },
  { $group: { _id: null, total: { $sum: "$amount" } } }
]);

const totalExpenses = await Transaction.aggregate([
  { $match: { runId: runId, type: "outflow" } },
  { $group: { _id: null, total: { $sum: "$amount" } } }
]);
```

### Get production line performance
```javascript
const line = await Line.findById(lineId)
  .populate({
    path: 'processStations',
    populate: [
      { path: 'assignedAssets' },
      { path: 'assignedEmployees' }
    ]
  });

// Calculate utilization
const totalOperatingTime = line.processStations.reduce(
  (sum, station) => sum + station.totalOperatingTime, 0
);
const totalTime = (Date.now() - line.startedAt) / 1000 / 60; // minutes
const utilizationRate = totalOperatingTime / (totalTime * line.processStations.length);
```

---

## Status Enums

### Game Status
- `draft` - Being configured
- `active` - Students can play
- `paused` - Temporarily stopped
- `completed` - Finished
- `archived` - Historical record

### Run Status
- `not-started` - Created but not begun
- `in-progress` - Currently playing
- `paused` - Temporarily stopped
- `completed` - Finished
- `abandoned` - Team quit

### Order Status
- `pending` - Not started
- `in-production` - Being made
- `completed` - Finished production
- `shipped` - Delivered to customer
- `cancelled` - Cancelled
- `late` - Past due date

### Line Status
- `idle` - Not producing
- `running` - Active production
- `paused` - Temporarily stopped
- `maintenance` - Under maintenance
- `shutdown` - Deactivated

### Asset Status
- `active` - In use
- `maintenance` - Being serviced
- `broken` - Needs repair
- `idle` - Not assigned
- `sold` - Disposed of

### Employee Status
- `active` - Working
- `on-leave` - Temporary absence
- `training` - In training
- `terminated` - No longer employed

---

## Validation Rules

### Before Creating Run
- ✅ Game must be "active"
- ✅ Team must belong to game
- ✅ Only one run per team per game

### Before Purchasing Material
- ✅ Material must be in game's availableMaterialIds
- ✅ Team must have sufficient capital
- ✅ Quantity > 0

### Before Hiring Employee
- ✅ EmployeeTemplate must be in game's availableEmployeeIds
- ✅ Team must have sufficient capital for hiringCost
- ✅ Employee name must be unique within run

### Before Creating Line
- ✅ BOM must be in game's availableBOMIds
- ✅ All BOM processes must be in game's availableProcessIds
- ✅ Line name must be unique within run

### Before Starting Production
- ✅ Line must have all required assets
- ✅ Line must have all required employees
- ✅ Sufficient materials in inventory
- ✅ Line status must be "idle" or "paused"

---

## Performance Metrics

### Run Metrics
```javascript
run.metrics = {
  totalUnitsProduced: Number,      // Total items made
  totalUnitsShipped: Number,       // Total items delivered
  onTimeDeliveryRate: Number,      // % orders on time
  defectRate: Number,              // % defective units
  utilizationRate: Number          // % time lines are active
}
```

### Calculated KPIs
```javascript
// Profit margin
const profitMargin = (run.totalRevenue - run.totalExpenses) / run.totalRevenue;

// ROI (Return on Investment)
const roi = (run.currentCapital - initialCapital) / initialCapital;

// Inventory turnover
const inventoryTurnover = run.totalRevenue / averageInventoryValue;

// Asset utilization
const assetUtilization = totalOperatingHours / (assets.length * totalHours);
```

---

## Time Simulation

### Time Fields in Run
```javascript
{
  currentMonth: Number,        // 1-12+ (simulation month)
  currentDay: Number,          // 1-30 (simulation day)
  simulationSpeed: Number,     // Time multiplier (1.0 = normal)
  isPaused: Boolean           // Pause state
}
```

### Monthly Events
- Pay employee salaries
- Pay recurring expenses
- Generate new orders
- Calculate depreciation
- Generate financial reports

### Daily Events
- Check order due dates
- Update production progress
- Process material deliveries
- Update metrics

---

## Export Format

All models export consistently:
```javascript
const modelNameModel = {
  ModelName,
};

export default modelNameModel;
```

Access model:
```javascript
import bomModel from './bom.model.js';
const { BOM } = bomModel;
```

---

## Quick Tips

### 1. Always Check Scope
```javascript
// Get templates accessible to professor
const templates = await BOM.find({
  $or: [
    { scope: "system" },
    { institutionId: professorInstitutionId, scope: "institution" },
    { professorId: professorId, scope: "professor" }
  ]
});
```

### 2. Use Transactions for All Money Movement
```javascript
// ALWAYS create transaction when capital changes
const transaction = await Transaction.create({
  runId, type, category, amount,
  balanceBefore, balanceAfter,
  transactionDate: new Date()
});
```

### 3. Update Timestamps
```javascript
// Models have createdAt, many have updatedAt
model.updatedAt = new Date();
await model.save();
```

### 4. Populate Carefully
```javascript
// Only populate what you need (performance)
const run = await Run.findById(runId)
  .populate('activeOrders')  // Good
  .populate('transactions'); // Bad if thousands of transactions
```

### 5. Use Aggregation for Reports
```javascript
// For large datasets, use aggregation
const monthlyRevenue = await Transaction.aggregate([
  { $match: { runId: runId, type: "inflow" } },
  { $group: {
    _id: "$accountingPeriod",
    total: { $sum: "$amount" }
  }},
  { $sort: { _id: 1 } }
]);
```

---

## File Locations

```
/models/
  /actors/                  # Users, Institutions
  /groups/                  # Classes, Groups, Teams
  /games/
    - game.model.js
    - game-configuration.model.js
    - run.model.js
    - line.model.js
    /config/                # OrdersConfig, PremisesConfig
    /templates/             # BOM, Employees, Assets, etc.
    /runtime/               # Orders, Inventory, Transactions, etc.
```

---

## Next Steps

1. ✅ Review this reference
2. ✅ Read ARCHITECTURE_REVISION_SUMMARY.md for full context
3. ✅ Read GAME_CREATION_WORKFLOW.md for implementation details
4. ✅ Create seed data using examples in workflow doc
5. ✅ Build API endpoints
6. ✅ Test with sample game

**Questions?** Refer to the analysis document or ask for clarification on specific models.

