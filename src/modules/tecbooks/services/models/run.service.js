import runModel from "#src/shared/models/games/run.model.js";
import gameConfigurationModel from "#src/shared/models/games/game-configuration.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js";

// Generate unique run code
const generateRunCode = () => {
    // Use base-36 (0-9, a-z) for 6 characters = ~2.2 billion combinations
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const getRunById = async (runId) => {
    try {
        const run = await runModel.Run.findById(runId)
            .populate('teamId', 'name studentIds')
            .populate('gameId', 'name code status')
            .populate('configurationId', 'name initialCapital gameDurationMonths');

        if (!run) {
            throw new NotFoundError(`Run with id ${runId} not found`);
        }

        return run;
    } catch (err) {
        if (err.statusCode) throw err;
        
        console.error("[Service] Error getting run by id:", err);
        throw new DatabaseError(`Failed to get run: ${err.message}`, err);
    }
};

const getRunsByGame = async (gameId, teamId) => {
    try {
        const runs = await runModel.Run.find({ gameId, teamId })
            .populate('teamId', 'name studentIds')
            .populate('configurationId', 'name initialCapital gameDurationMonths')
            .sort({ createdAt: -1 });
        
        return runs;
    } catch (err) {
        console.error("[Service] Error getting runs by game:", err);
        throw new DatabaseError(`Failed to get runs: ${err.message}`, err);
    }
}

const createRun = async (gameId, teamId, configurationId) => {
    try {
        // Generate unique code with retry limit
        let code;
        let attempts = 0;
        const maxAttempts = 10;
        
        while (attempts < maxAttempts) {
            code = generateRunCode();
            const codeExists = await runModel.Run.findOne({ code });
            
            if (!codeExists) {
                break; // Found unique code
            }
            
            attempts++;
            
            if (attempts === maxAttempts) {
                throw new DatabaseError("Failed to generate unique run code after multiple attempts");
            }
        }

        // Get configuration to get initial capital
        const config = await gameConfigurationModel.GameConfiguration.findById(configurationId);
        
        if (!config) {
            throw new NotFoundError(`Configuration with id ${configurationId} not found`);
        }

        const newRun = await runModel.Run.create({
            gameId,
            teamId,
            configurationId,
            code,
            currentCapital: config.initialCapital || 1000000,
            status: "not-started"
        });

        return newRun;
    } catch (err) {
        console.error("[Service] Error creating run:", err);
        
        if (err.code === 11000 && err.keyPattern?.code) {
            throw new DatabaseError("Run code collision detected. Please try again.", err);
        }
        
        if (err.statusCode) throw err;
        throw new DatabaseError(`Failed to create run: ${err.message}`, err);
    }
}

const activateRun = async (runId) => {
    try {
        const updatedRun = await runModel.Run.findByIdAndUpdate(
            runId,
            { 
                $set: { 
                    status: "in-progress",
                    startedAt: new Date(),
                    updatedAt: new Date()
                } 
            },
            { new: true, runValidators: true }
        );

        if (!updatedRun) {
            throw new NotFoundError(`Run with id ${runId} not found`);
        }

        return updatedRun;
    } catch (err) {
        if (err.statusCode) throw err;
        
        console.error("[Service] Error activating run:", err);
        throw new DatabaseError(`Failed to activate run: ${err.message}`, err);
    }
}

const pauseRun = async (runId) => {
    try {
        const updatedRun = await runModel.Run.findByIdAndUpdate(
            runId,
            { 
                $set: { 
                    status: "paused",
                    updatedAt: new Date()
                } 
            },
            { new: true, runValidators: true }
        );

        if (!updatedRun) {
            throw new NotFoundError(`Run with id ${runId} not found`);
        }

        return updatedRun;
    } catch (err) {
        if (err.statusCode) throw err;
        
        console.error("[Service] Error pausing run:", err);
        throw new DatabaseError(`Failed to pause run: ${err.message}`, err);
    }
}

const completeRun = async (runId) => {
    try {
        const updatedRun = await runModel.Run.findByIdAndUpdate(
            runId,
            { 
                $set: { 
                    status: "completed",
                    endedAt: new Date(),
                    updatedAt: new Date()
                } 
            },
            { new: true, runValidators: true }
        );

        if (!updatedRun) {
            throw new NotFoundError(`Run with id ${runId} not found`);
        }

        return updatedRun;
    } catch (err) {
        if (err.statusCode) throw err;
        
        console.error("[Service] Error completing run:", err);
        throw new DatabaseError(`Failed to complete run: ${err.message}`, err);
    }
}

const runService = {
    getRunById,
    getRunsByGame,
    createRun,
    activateRun,
    pauseRun,
    completeRun,
}

export default runService;
