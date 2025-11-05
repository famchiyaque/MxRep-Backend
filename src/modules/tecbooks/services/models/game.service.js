import gameModel from "#src/shared/models/games/game.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js";

// Generate unique game code
const generateGameCode = () => {
  // Use base-36 (0-9, a-z) for 6 characters = ~2.2 billion combinations
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const createGame = async (institutionId, professorId, groupId, configurationId, name, description) => {
  try {
    // Generate unique code with retry limit
    let code;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      code = generateGameCode();
      const codeExists = await gameModel.Game.findOne({ code });
      
      if (!codeExists) {
        break; // Found unique code
      }
      
      attempts++;
      
      if (attempts === maxAttempts) {
        throw new DatabaseError("Failed to generate unique game code after multiple attempts");
      }
    }

    const newGame = await gameModel.Game.create({
      institutionId,
      professorId,
      groupId,
      configurationId,
      name,
      code,
      description,
      status: "draft"
    });

    return newGame;
  } catch (err) {
    console.error("[Service] Error creating game:", err);
    
    // Handle duplicate key error (race condition caught by DB)
    if (err.code === 11000 && err.keyPattern?.code) {
      throw new DatabaseError("Game code collision detected. Please try again.", err);
    }
    
    if (err.statusCode) throw err; // Re-throw if already an AppError
    throw new DatabaseError(`Failed to create game: ${err.message}`, err);
  }
};

const getGameById = async (gameId) => {
  try {
    const game = await gameModel.Game.findById(gameId)
      .populate('institutionId', 'name')
      .populate('professorId', 'firstNames lastNames email')
      .populate('groupId', 'name')
      .populate('configurationId');
    
    if (!game) {
      throw new NotFoundError(`Game with id ${gameId} not found`);
    }

    return game;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error getting game by id:", err);
    throw new DatabaseError(`Failed to get game: ${err.message}`, err);
  }
};

const getGameByCode = async (code) => {
  try {
    const game = await gameModel.Game.findOne({ code })
      .populate('configurationId');
    
    if (!game) {
      throw new NotFoundError(`Game with code ${code} not found`);
    }

    return game;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error getting game by code:", err);
    throw new DatabaseError(`Failed to get game: ${err.message}`, err);
  }
};

const getGamesByProfessor = async (professorId) => {
  try {
    const games = await gameModel.Game.find({ professorId })
      .populate('groupId', 'name')
      .populate('configurationId', 'name initialCapital gameDurationMonths')
      .sort({ createdAt: -1 });

    return games;
  } catch (err) {
    console.error("[Service] Error getting games by professor:", err);
    throw new DatabaseError(`Failed to get games: ${err.message}`, err);
  }
};

const getGamesByGroup = async (groupId) => {
  try {
    const games = await gameModel.Game.find({ groupId })
      .populate('professorId', 'firstNames lastNames email')
      .populate('configurationId', 'name initialCapital gameDurationMonths')
      .sort({ createdAt: -1 });

    return games;
  } catch (err) {
    console.error("[Service] Error getting games by group:", err);
    throw new DatabaseError(`Failed to get games: ${err.message}`, err);
  }
};

const updateGame = async (gameId, updates) => {
  try {
    const updatedGame = await gameModel.Game.findByIdAndUpdate(
      gameId,
      { $set: { ...updates, updatedAt: new Date() } },
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      throw new NotFoundError(`Game with id ${gameId} not found`);
    }

    return updatedGame;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error updating game:", err);
    throw new DatabaseError(`Failed to update game: ${err.message}`, err);
  }
};

const activateGame = async (gameId) => {
  try {
    const updatedGame = await gameModel.Game.findByIdAndUpdate(
      gameId,
      { 
        $set: { 
          status: "active",
          startDate: new Date(),
          updatedAt: new Date()
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      throw new NotFoundError(`Game with id ${gameId} not found`);
    }

    return updatedGame;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error activating game:", err);
    throw new DatabaseError(`Failed to activate game: ${err.message}`, err);
  }
};

const pauseGame = async (gameId) => {
  try {
    const updatedGame = await gameModel.Game.findByIdAndUpdate(
      gameId,
      { 
        $set: { 
          status: "paused",
          updatedAt: new Date()
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      throw new NotFoundError(`Game with id ${gameId} not found`);
    }

    return updatedGame;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error pausing game:", err);
    throw new DatabaseError(`Failed to pause game: ${err.message}`, err);
  }
};

const completeGame = async (gameId) => {
  try {
    const updatedGame = await gameModel.Game.findByIdAndUpdate(
      gameId,
      { 
        $set: { 
          status: "completed",
          endDate: new Date(),
          updatedAt: new Date()
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      throw new NotFoundError(`Game with id ${gameId} not found`);
    }

    return updatedGame;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error completing game:", err);
    throw new DatabaseError(`Failed to complete game: ${err.message}`, err);
  }
};

const deleteGame = async (gameId) => {
  try {
    const deletedGame = await gameModel.Game.findByIdAndDelete(gameId);

    if (!deletedGame) {
      throw new NotFoundError(`Game with id ${gameId} not found`);
    }

    return deletedGame;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error deleting game:", err);
    throw new DatabaseError(`Failed to delete game: ${err.message}`, err);
  }
};

const gameService = {
  createGame,
  getGameById,
  getGameByCode,
  getGamesByProfessor,
  getGamesByGroup,
  updateGame,
  activateGame,
  pauseGame,
  completeGame,
  deleteGame,
};

export default gameService;

