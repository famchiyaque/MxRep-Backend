exports.getCycleTime = async (processes) => {
    
    let totalTime = 0
    let totalOperators = 0
    const cycleTimeExplain = {
        totalCycleTime : 0.0,
        totalOperators : 0
    };

    if (!processes || !Array.isArray(processes)) {
        return cycleTimeExplain;
    }

    for (const process of processes){
        const time = parseFloat(process.totalTime) || 0;
        const operators = parseFloat(process.numberOperators) || 0;
        
        if (operators > 0) {
            totalTime += time / operators;
            totalOperators += operators;
        }
    }

    cycleTimeExplain.totalCycleTime = totalTime
    cycleTimeExplain.totalOperators = totalOperators
    
    return cycleTimeExplain
}