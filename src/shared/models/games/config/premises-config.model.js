import mongoose from 'mongoose'

const PremisesConfigSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  economics: {
    closingExchangeRate: { type: Number, default: 16.66 },
    nationalPrimeRate: { type: Number, default: 0.16 },
    cpp: { type: Number, default: 0.28 }, // not translated (context-specific)
    treasuryBills: { type: Number, default: 0.332 },
    libor: { type: Number, default: 0.077 },
  },
  tax: {
    nationalInflation: { type: Number, default: 0.043 },
    incomeTaxRate: { type: Number, default: 0.34 },
    corporateTaxRate: { type: Number, default: 1.8 }, // "IMPAC" often refers to asset-based tax
    employeeProfitSharingRate: { type: Number, default: 0.1 }, // "PTU"
    foreignInflation: { type: Number, default: null },
  },
  policies: {
    inventoryPercentage: { type: Number, default: 0.2 },
    suppliersPercentage: { type: Number, default: 0.2 },
    shortTermLiabilityPercentage: { type: Number, default: 0.03 },
    directProductCostPercentage: { type: Number, default: 0.15 },
    indirectProductCostPercentage: { type: Number, default: 0.05 },
    salesExpensePercentage: { type: Number, default: 0.002 },
    administrationPercentage: { type: Number, default: 0.005 },
    buildingDepreciationRate: { type: Number, default: 0.05 },
    machineryAndEquipmentDepreciationRate: { type: Number, default: 0.1 },
    transportEquipmentDepreciationRate: { type: Number, default: 0.2 },
    computerEquipmentDepreciationRate: { type: Number, default: 0.085 },
  },
})

const PremisesConfig = mongoose.model('PremisesConfig', PremisesConfigSchema)

const premisesConfigModel = {
  PremisesConfig,
}

export default premisesConfigModel
