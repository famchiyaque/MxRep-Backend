const mongoose = require("mongoose");

const PremisaSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  economicas: {
    tipoCambioCierre: { type: Number, default: 16.66 },
    tasaLiderNacional: { type: Number, default: 0.16 },
    cpp: { type: Number, default: 0.28 },
    cetes: { type: Number, default: 0.332 },
    libor: { type: Number, default: 0.077 },
  },
  fiscales: {
    inflacionNacional: { type: Number, default: 0.043 },
    tasaISR: { type: Number, default: 0.34 },
    tasaIMPAC: { type: Number, default: 1.8 },
    tasaPTU: { type: Number, default: 0.1 },
    inflacionExtranjera: { type: Number, default: null },
  },
  politicas: {
    porcentajeInventario: { type: Number, default: 0.2 },
    porcentajeProveedores: { type: Number, default: 0.2 },
    porcentajePasivoCortoPlazo: { type: Number, default: 0.03 },
    porcentajeCostoDirectoProducto: { type: Number, default: 0.15 },
    porcentajeCostoIndirectoProducto: { type: Number, default: 0.05 },
    porcentajeGastoVenta: { type: Number, default: 0.002 },
    porcentajeAdministracion: { type: Number, default: 0.005 },
    porcentajeDepreciacionEdificios: { type: Number, default: 0.05 },
    porcentajeDepreciacionMaquinariaEquipo: { type: Number, default: 0.1 },
    porcentajeDepreciacionEquipoTransporte: { type: Number, default: 0.2 },
    porcentajeDepreciacionEquipoComputo: { type: Number, default: 0.085 },
  },
});


const Premisa = mongoose.model("Premisa", PremisaSchema);

const findByIdProductionLineTemplate = async (productionLineIdTemplate) => {
  console.log(`Model: Buscando plantilla con id ${productionLineIdTemplate}`);
  
  return await Premisa.findOne({ year: Number(productionLineIdTemplate) });
  
  
};


module.exports = {
  findByIdProductionLineTemplate,
  Premisa
};
