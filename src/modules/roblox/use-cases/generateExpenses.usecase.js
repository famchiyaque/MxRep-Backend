import getInvestmentService from "../services/getInvestment.service.js"

const generateExpenses = async (investmentData) => {
  const investmentSum = await getInvestmentService.getInvestment(
    investmentData
  );

  console.log("investmentSum: ", investmentSum);
};

const generateExpensesUseCase = {
  generateExpenses
}

export default generateExpensesUseCase