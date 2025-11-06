import studentPanelUseCases from "../use-cases/student-panel.use-cases.js";

const getMyGames = async (req, res) => {
    try {
        const decodedToken = req.user;
        const { userId: studentId } = decodedToken.body;

        const games = await studentPanelUseCases.getMyGames(studentId);
        
        return res.status(200).json({
            success: true,
            message: "Games fetched successfully",
            data: games,
            count: games.length
        });
    }
    catch (error) {
        console.error("[Controller] Error getting my games:", error);
        
        const status = error.statusCode || 500;
        const message = error.message || "Internal server error";
        
        return res.status(status).json({
            success: false,
            error: message
        });
    }
}

const getGame = async (req, res) => {
    try {
        const { gameId } = req.query;
        const decodedToken = req.user;
        const { userId: studentId } = decodedToken.body;
        
        if (!gameId) {
            return res.status(400).json({
                success: false,
                error: "Game ID is required"
            });
        }

        const game = await studentPanelUseCases.getGame(gameId, studentId);
        
        return res.status(200).json({
            success: true,
            message: "Game fetched successfully",
            data: game
        });
    }
    catch (error) {
        console.error("[Controller] Error getting game:", error);
        
        const status = error.statusCode || 500;
        const message = error.message || "Internal server error";
        
        return res.status(status).json({
            success: false,
            error: message
        });
    }
}

const getRuns = async (req, res) => {
    try {
        const { gameId, teamId } = req.query;
        const decodedToken = req.user;
        const { userId: studentId } = decodedToken.body;

        if (!gameId) {
            return res.status(400).json({
                success: false,
                error: "Game ID is required"
            });
        }

        if (!teamId) {
            return res.status(400).json({
                success: false,
                error: "Team ID is required"
            });
        }

        const runs = await studentPanelUseCases.getRuns(gameId, teamId, studentId);
        
        return res.status(200).json({
            success: true,
            message: "Runs fetched successfully",
            data: runs,
            count: runs.length
        });
    }
    catch (error) {
        console.error("[Controller] Error getting runs:", error);
        
        const status = error.statusCode || 500;
        const message = error.message || "Internal server error";
        
        return res.status(status).json({
            success: false,
            error: message
        });
    }
}

const createRun = async (req, res) => {
    try {
        const { gameId, teamId } = req.body;
        const decodedToken = req.user;
        const { userId: studentId } = decodedToken.body;

        if (!gameId) {
            return res.status(400).json({
                success: false,
                error: "Game ID is required"
            });
        }

        if (!teamId) {
            return res.status(400).json({
                success: false,
                error: "Team ID is required"
            });
        }

        const run = await studentPanelUseCases.createRun(gameId, teamId, studentId);
        
        return res.status(201).json({
            success: true,
            message: "Run created successfully",
            data: run
        });
    }
    catch (error) {
        console.error("[Controller] Error creating run:", error);
        
        const status = error.statusCode || 500;
        const message = error.message || "Internal server error";
        
        return res.status(status).json({
            success: false,
            error: message
        });
    }
}

const activateRun = async (req, res) => {
    try {
        const { runId } = req.body;
        const decodedToken = req.user;
        const { userId: studentId } = decodedToken.body;

        if (!runId) {
            return res.status(400).json({
                success: false,
                error: "Run ID is required"
            });
        }

        const run = await studentPanelUseCases.activateRun(runId, studentId);
        
        return res.status(200).json({
            success: true,
            message: "Run activated successfully",
            data: run
        });
    } catch (error) {
        console.error("[Controller] Error activating run:", error);
        
        const status = error.statusCode || 500;
        const message = error.message || "Internal server error";
        
        return res.status(status).json({
            success: false,
            error: message
        });
    }
}

const pauseRun = async (req, res) => {
    try {
        const { runId } = req.body;
        const decodedToken = req.user;
        const { userId: studentId } = decodedToken.body;

        if (!runId) {
            return res.status(400).json({
                success: false,
                error: "Run ID is required"
            });
        }

        const run = await studentPanelUseCases.pauseRun(runId, studentId);
        
        return res.status(200).json({
            success: true,
            message: "Run paused successfully",
            data: run
        });
    }
    catch (error) {
        console.error("[Controller] Error pausing run:", error);
        
        const status = error.statusCode || 500;
        const message = error.message || "Internal server error";
        
        return res.status(status).json({
            success: false,
            error: message
        });
    }
}

const completeRun = async (req, res) => {
    try {
        const { runId } = req.body;
        const decodedToken = req.user;
        const { userId: studentId } = decodedToken.body;

        if (!runId) {
            return res.status(400).json({
                success: false,
                error: "Run ID is required"
            });
        }

        const run = await studentPanelUseCases.completeRun(runId, studentId);
        
        return res.status(200).json({
            success: true,
            message: "Run completed successfully",
            data: run
        });
    }
    catch (error) {
        console.error("[Controller] Error completing run:", error);
        
        const status = error.statusCode || 500;
        const message = error.message || "Internal server error";
        
        return res.status(status).json({
            success: false,
            error: message
        });
    }
}

const studentPanelControllers = {
    getMyGames,
    getGame,
    activateRun,
    pauseRun,
    completeRun,
    getRuns,
    createRun,
}

export default studentPanelControllers;
