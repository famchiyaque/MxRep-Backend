const getInvestmentService = require("../services/getInvestment.service.js");

exports.generateExpenses = async (investmentData) => {
  const investmentSum = await getInvestmentService.getInvestment(
    investmentData
  );

  console.log("investmentSum: ", investmentSum);
};
