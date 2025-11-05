import mongoose from 'mongoose'

const componentproductionLineSchema = new mongoose.Schema({
  productionLineId: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: Number, required: true },
  type: { type: String, required: true },
  year: { type: Date, required: true },
}, {
  collection: 'ComponentProductionLine'
});

const workersSchema = new mongoose.Schema({
  workerId : { type: String, required: true },
  role : { type: String, required: true },
  salary : { type: Number, required: true },
  roleArea : { type: String, required: true },
}, {
  collection: 'Worker'
});

const productionLineTemplateSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  productionLineId : { type: String, required: true },
  bomId : mongoose.Schema.Types.ObjectId, 
  components : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "ComponentProductionLine",
    },
  ],
  workers:  [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Worker",
    },
  ],
}, {
  collection: 'ProductionLineTemplate' 
});

const productionLineTemplate = mongoose.model("ProductionLineTemplate", productionLineTemplateSchema);

const componentProductionLine = mongoose.model("ComponentProductionLine", componentproductionLineSchema);

const workerModel = mongoose.model("Worker", workersSchema);



const findByIdProductionLineTemplate = async (productionLineIdTemplate) => {

  const production = await productionLineTemplate.findOne({ productionLineId: productionLineIdTemplate }).populate('components').populate('workers');
  
  return production;
};

const productionLineTemplateModel = {
  findByIdProductionLineTemplate,
  componentProductionLine,
  workerModel,
  productionLineTemplate,
};

export default productionLineTemplateModel