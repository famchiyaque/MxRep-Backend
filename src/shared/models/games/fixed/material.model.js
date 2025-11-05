import mongoose from 'mongoose'

const MaterialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
});

const Material = mongoose.model("Material", MaterialSchema);

const materialModel = {
    Material,
};

export default materialModel