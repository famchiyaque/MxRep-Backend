const BoomModel = require("../models/bom.model");

exports.getBom = async (bomId) => {
  console.log(`Repository: Buscando BOM con id ${bomId}`);

  return  bom = await BoomModel.findByBomId(bomId);

};

