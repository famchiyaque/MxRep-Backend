const getInvestment = async (investmentData = {}) => {
  const {
    building = 6053000.0,
    machineryAndEquipment = 8060000.0,
    computerEquipment = 217350.0,
    transport = 1440000.0,
    workingCapital = 22428530.56,
    machineryAndEquipmentCivilWorks = 2821000.0,
  } = investmentData;

  const total =
    building +
    machineryAndEquipment +
    computerEquipment +
    transport +
    workingCapital +
    machineryAndEquipmentCivilWorks;

  return {
    totalInvestment: total,
    building: building,
    machinaryAndEquipment: machineryAndEquipment,
    computerEquipment: computerEquipment,
    transport: transport,
    workingCapital: workingCapital,
    machinaryAndEquipmentCivilWorks: machineryAndEquipmentCivilWorks,
  };
};

const getInvestmentService = {
  getInvestment
}

export default getInvestmentService