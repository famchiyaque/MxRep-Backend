const mongoose = require("mongoose");

const BomComponentSchema = new mongoose.Schema({
  componentId: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  scrap: { type: String, default: "100%" },
});

const BomSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bomId: { type: String, required: true }, // ID interno del BOM
  name: { type: String, required: true }, // Nombre del producto o ensamble
  components: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BomComponent",
    },
  ],
  subtotal: {type: Number, required: false} 
});

const BomComponent = mongoose.model("BomComponent", BomComponentSchema);
const BOM = mongoose.model("BOM", BomSchema);

 
const findByBomId = async (bomId) => {

  const bom = await BOM.findOne({ bomId: bomId }).populate('components');
  
  return bom;
};


module.exports = {
  findByBomId,
  BOM,
  BomComponent,
};
