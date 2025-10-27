const BoomModel = require("../../models/bom.model.js");

exports.getBom = async (bomId) => {

  return  bom = await BoomModel.findByBomId(bomId);

};
