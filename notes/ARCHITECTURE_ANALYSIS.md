# MxRep Game Architecture Analysis & Revision Plan

## Current Hierarchy
```
Institution
  └─ User (professors, students)
      └─ Class
          └─ Group (students)
              └─ Game
                  ├─ GameConfiguration
                  │   ├─ OrdersConfig
                  │   ├─ PremisesConfig
                  │   ├─ Available: BOMs, Employees, Assets, Expenses
                  └─ Team (students from group)
                      └─ Run (game instance)
                          └─ Line (production line)
                              └─ Processes
```

---

## CRITICAL ISSUES FOUND

### 🔴 1. CIRCULAR DEPENDENCY: Game ↔ GameConfiguration
**Problem:** 
- `Game.configurationId` → `GameConfiguration`
- `GameConfiguration.gameId` → `Game`

**This is a chicken-and-egg problem!** You can't create a Game without a GameConfiguration, and you can't create a GameConfiguration without a Game.

**Solution:** Remove `gameId` from `GameConfiguration`. The configuration should exist independently and can be referenced by multiple games (reusability).

---

### 🔴 2. MULTI-TENANCY SECURITY FLAW
**Problem:** All "fixed" resources (BOM, Employee, Job, Skill, Asset, Material, Process, Expense) are GLOBAL. This means:
- Professor A creates a custom BOM → Professor B can see and use it
- Institution X's materials → visible to Institution Y
- No data isolation whatsoever

**Solution:** Add `institutionId` and/or `professorId` to ALL fixed resources with proper scoping:
- **System-level resources**: No owner (provided by MxRep)
- **Institution-level**: Shared within institution
- **Professor-level**: Private to professor

---

### 🔴 3. CONCEPTUAL CONFUSION: Employee vs Job
**Problem:**
- `Employee` has skills and efficiency (seems like a template/type)
- `Job` has skills needed and salary (also seems like a template/type)
- No clear distinction between "employee type" and "hired employee instance"

**Real-world model should be:**
- `EmployeeType` (template): "Assembly Line Worker", skills needed, base salary
- `HiredEmployee` (instance): Actual employee hired by team in a Run

---

### 🔴 4. MISSING: Order Instance Model
**Problem:**
- `OrdersConfig` defines distribution (% by month)
- `OrderConfig` looks like a single order template
- `Run.orders` references "Order" model that doesn't exist
- No way to track actual orders during gameplay

**Solution:** Create `Order` model for runtime order instances.

---

### 🔴 5. INVENTORY CONFUSION
**Problem:**
- `Run.inventory` references `Material` (which is a template/definition)
- Should reference `InventoryItem` (material + quantity + location)

---

### 🔴 6. ASSET CONFUSION
**Problem:**
- `Asset` in `/fixed/` is a template (type of asset)
- `Run.assets` should reference purchased asset instances
- No distinction between "available to buy" vs "owned by team"

---

### 🔴 7. EXPENSE CONFUSION
**Problem:**
- `Expense` in `/fixed/` is a template
- `Run.expenses` should reference actual expense instances
- Missing recurring expense tracking

---

### 🔴 8. PROCESS-LINE RELATIONSHIP UNCLEAR
**Problem:**
- `Line.processes` references Process (template)
- `BOM.processes` also references Process
- Should a Line reference BOM processes? Or configure its own?
- Missing: ProcessStation (instance of a process in a line)

---

### 🔴 9. MISSING CRITICAL MODELS
- `Order` (runtime order instances)
- `InventoryItem` (material + quantity)
- `PurchasedAsset` (asset instance owned by team)
- `HiredEmployee` (employee instance hired by team)
- `RecurringExpense` (expense instance for team)
- `ProcessStation` (process instance in a line)
- `ProductionBatch` (tracking production runs)

---

### 🟡 10. FOLDER STRUCTURE ISSUES
**Current:**
```
/fixed/        - Templates (BOM, Employee, Job, etc.)
/config/       - Game configuration
/finances/     - Runtime financial records
```

**Problems:**
- "fixed" is vague - should be "templates" or "definitions"
- Missing "/runtime/" or "/instances/" for game state
- Inflow/Outflow should be in runtime, not separate "finances"

---

### 🟡 11. MISSING FIELDS

**Game:**
- `code` (unique game code for students to enter)
- `institutionId` (for filtering)
- `startDate`, `endDate` (game duration)

**GameConfiguration:**
- `initialCapital` (starting money for teams)
- `gameDurationMonths` (how long the simulation runs)
- `allowedActions` (what teams can do)

**Run:**
- Missing `currentMonth` or `currentDay` (simulation time)
- Missing `score` or `performance` metrics

**BOM:**
- Missing `productionTime` (how long to make)
- Missing `sellingPrice` (revenue per unit)

**Process:**
- Missing `duration` (how long it takes)
- Missing `cost` (operating cost)

**Material:**
- Missing `leadTime` (delivery time)
- Missing `supplier` info

---

## LOGICAL INCONSISTENCIES

### Production Line Logic
**Issue:** The relationship between BOM → Process → Line is unclear.

**Real-world should be:**
1. BOM defines WHAT to make (materials + processes needed)
2. Process defines HOW to do a step (assets + jobs needed, duration)
3. Line is WHERE production happens (configured processes + assigned employees)
4. ProductionBatch is WHEN something is made (specific run of a BOM on a Line)

---

### Financial Tracking
**Issue:** Inflow/Outflow are too generic.

**Better approach:**
- Track transactions with proper categorization
- Link to source (e.g., Outflow → PurchasedAsset, Inflow → CompletedOrder)
- Enable financial reports (P&L, Balance Sheet)

---

### Time Simulation
**Issue:** No clear time model.

**Questions:**
- Is this turn-based (monthly/weekly) or real-time?
- How do orders arrive?
- How does production time work?
- When do employees get paid?

---

## RECOMMENDATIONS

### Phase 1: Fix Critical Issues (Do Now)
1. ✅ Remove circular dependency (remove gameId from GameConfiguration)
2. ✅ Add multi-tenancy to all fixed resources
3. ✅ Rename "fixed" → "templates"
4. ✅ Create runtime instance models
5. ✅ Add missing Order model
6. ✅ Add scoping fields (institutionId, professorId, scope)

### Phase 2: Enhance Models (Next)
1. Add missing fields for gameplay
2. Create proper financial transaction model
3. Add time simulation fields
4. Add validation and constraints

### Phase 3: Future Extensibility
1. Add versioning to configurations (allow updates without breaking games)
2. Add analytics/metrics models
3. Add event/audit log
4. Add multiplayer/competition features

---

## PROPOSED NEW STRUCTURE

```
/models/
  /actors/
    - institution.model.js
    - user.model.js
  /groups/
    - class.model.js
    - group.model.js
    - team.model.js
  /games/
    - game.model.js
    - game-configuration.model.js
    /templates/          (formerly "fixed")
      - bom-template.model.js
      - employee-template.model.js
      - job-template.model.js
      - skill.model.js
      - asset-template.model.js
      - material-template.model.js
      - process-template.model.js
      - expense-template.model.js
    /config/
      - orders-config.model.js
      - premises-config.model.js
    /runtime/            (NEW)
      - run.model.js
      - line.model.js
      - order.model.js
      - inventory-item.model.js
      - purchased-asset.model.js
      - hired-employee.model.js
      - recurring-expense.model.js
      - process-station.model.js
      - production-batch.model.js
      - transaction.model.js      (replaces inflow/outflow)
```

---

## NEXT STEPS
1. Review and approve this analysis
2. Implement Phase 1 fixes
3. Test with sample game creation flow
4. Document game creation workflow
5. Create seed data for testing

