import professorPanelUseCases from "../use-cases/professor-panel.use-cases.js";

// ===== STUDENT CONTROLLERS =====
const getInstitutionStudents = async (req, res) => {
  try {
    const decodedToken = req.user;
    const { institutionId } = decodedToken.body;

    const students = await professorPanelUseCases.getInstitutionStudents(institutionId);

    return res.status(200).json({
      success: true,
      data: students,
      count: students.length
    });
  } catch (error) {
    console.error("[Controller] Error getting institution students:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

// ===== CLASS CONTROLLERS =====

const createClass = async (req, res) => {
  try {
    console.log("Creating class...")
    const { name, description, code } = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    if (!name || !code) {
      return res.status(400).json({
        success: false,
        error: "Class name and code are required"
      });
    }

    const newClass = await professorPanelUseCases.createClass(
      institutionId,
      professorId,
      name,
      description,
      code
    );

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass
    });
  } catch (error) {
    console.error("[Controller] Error creating class:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getMyClasses = async (req, res) => {
  try {
    // console.log("Getting classed by professor...")
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    const classes = await professorPanelUseCases.getMyClasses(professorId);
    // console.log("Classes: ", classes)

    return res.status(200).json({
      success: true,
      data: classes,
      count: classes.length
    });
  } catch (error) {
    console.error("[Controller] Error getting classes:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getClass = async (req, res) => {
  try {
    const { classId } = req.query;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!classId) {
      return res.status(400).json({
        success: false,
        error: "Class ID is required"
      });
    }

    const classDoc = await professorPanelUseCases.getClass(classId, professorId);

    return res.status(200).json({
      success: true,
      data: classDoc
    });
  } catch (error) {
    console.error("[Controller] Error getting class:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const updateClass = async (req, res) => {
  try {
    const { classId, ...updates } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!classId) {
      return res.status(400).json({
        success: false,
        error: "Class ID is required"
      });
    }

    const updatedClass = await professorPanelUseCases.updateClass(classId, professorId, updates);

    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass
    });
  } catch (error) {
    console.error("[Controller] Error updating class:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { classId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!classId) {
      return res.status(400).json({
        success: false,
        error: "Class ID is required"
      });
    }

    const deletedClass = await professorPanelUseCases.deleteClass(classId, professorId);

    return res.status(200).json({
      success: true,
      message: "Class deleted successfully",
      data: deletedClass
    });
  } catch (error) {
    console.error("[Controller] Error deleting class:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

// ===== GROUP CONTROLLERS =====

const createGroup = async (req, res) => {
  try {
    const { classId, name, description, code } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!classId || !name) {
      return res.status(400).json({
        success: false,
        error: "Class ID and group name are required"
      });
    }

    const newGroup = await professorPanelUseCases.createGroup(
      classId,
      professorId,
      name,
      description,
      code
    );

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: newGroup
    });
  } catch (error) {
    console.error("[Controller] Error creating group:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getMyGroups = async (req, res) => {
  try {
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    const groups = await professorPanelUseCases.getMyGroups(professorId);

    return res.status(200).json({
      success: true,
      data: groups,
      count: groups.length
    });
  } catch (error) {
    console.error("[Controller] Error getting groups:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getGroup = async (req, res) => {
  try {
    const { groupId } = req.query;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        error: "Group ID is required"
      });
    }

    const group = await professorPanelUseCases.getGroup(groupId, professorId);

    return res.status(200).json({
      success: true,
      data: group
    });
  } catch (error) {
    console.error("[Controller] Error getting group:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { groupId, ...updates } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        error: "Group ID is required"
      });
    }

    const updatedGroup = await professorPanelUseCases.updateGroup(groupId, professorId, updates);

    return res.status(200).json({
      success: true,
      message: "Group updated successfully",
      data: updatedGroup
    });
  } catch (error) {
    console.error("[Controller] Error updating group:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const addStudentToGroup = async (req, res) => {
  try {
    const { groupId, studentId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!groupId || !studentId) {
      return res.status(400).json({
        success: false,
        error: "Group ID and student ID are required"
      });
    }

    const updatedGroup = await professorPanelUseCases.addStudentToGroup(groupId, professorId, studentId);

    return res.status(200).json({
      success: true,
      message: "Student added to group successfully",
      data: updatedGroup
    });
  } catch (error) {
    console.error("[Controller] Error adding student to group:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const removeStudentFromGroup = async (req, res) => {
  try {
    const { groupId, studentId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!groupId || !studentId) {
      return res.status(400).json({
        success: false,
        error: "Group ID and student ID are required"
      });
    }

    const updatedGroup = await professorPanelUseCases.removeStudentFromGroup(groupId, professorId, studentId);

    return res.status(200).json({
      success: true,
      message: "Student removed from group successfully",
      data: updatedGroup
    });
  } catch (error) {
    console.error("[Controller] Error removing student from group:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        error: "Group ID is required"
      });
    }

    const deletedGroup = await professorPanelUseCases.deleteGroup(groupId, professorId);

    return res.status(200).json({
      success: true,
      message: "Group deleted successfully",
      data: deletedGroup
    });
  } catch (error) {
    console.error("[Controller] Error deleting group:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

// ===== GAME CONTROLLERS =====

const createGame = async (req, res) => {
  try {
    const gameData = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    // Validate required fields
    if (!gameData.groupId || !gameData.name) {
      return res.status(400).json({
        success: false,
        error: "Group ID and game name are required"
      });
    }

    const newGame = await professorPanelUseCases.createGame(
      institutionId,
      professorId,
      gameData
    );

    return res.status(201).json({
      success: true,
      message: "Game created successfully",
      data: newGame
    });
  } catch (error) {
    console.error("[Controller] Error creating game:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getMyGames = async (req, res) => {
  try {
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    const games = await professorPanelUseCases.getMyGames(professorId);

    return res.status(200).json({
      success: true,
      data: games,
      count: games.length
    });
  } catch (error) {
    console.error("[Controller] Error getting games:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getGame = async (req, res) => {
  try {
    const { gameId } = req.query;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!gameId) {
      return res.status(400).json({
        success: false,
        error: "Game ID is required"
      });
    }

    const game = await professorPanelUseCases.getGame(gameId, professorId);

    return res.status(200).json({
      success: true,
      data: game
    });
  } catch (error) {
    console.error("[Controller] Error getting game:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const updateGame = async (req, res) => {
  try {
    const { gameId, ...updates } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!gameId) {
      return res.status(400).json({
        success: false,
        error: "Game ID is required"
      });
    }

    const updatedGame = await professorPanelUseCases.updateGame(gameId, professorId, updates);

    return res.status(200).json({
      success: true,
      message: "Game updated successfully",
      data: updatedGame
    });
  } catch (error) {
    console.error("[Controller] Error updating game:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const activateGame = async (req, res) => {
  try {
    const { gameId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!gameId) {
      return res.status(400).json({
        success: false,
        error: "Game ID is required"
      });
    }

    const activatedGame = await professorPanelUseCases.activateGame(gameId, professorId);

    return res.status(200).json({
      success: true,
      message: "Game activated successfully",
      data: activatedGame
    });
  } catch (error) {
    console.error("[Controller] Error activating game:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const pauseGame = async (req, res) => {
  try {
    const { gameId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!gameId) {
      return res.status(400).json({
        success: false,
        error: "Game ID is required"
      });
    }

    const pausedGame = await professorPanelUseCases.pauseGame(gameId, professorId);

    return res.status(200).json({
      success: true,
      message: "Game paused successfully",
      data: pausedGame
    });
  } catch (error) {
    console.error("[Controller] Error pausing game:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const completeGame = async (req, res) => {
  try {
    const { gameId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!gameId) {
      return res.status(400).json({
        success: false,
        error: "Game ID is required"
      });
    }

    const completedGame = await professorPanelUseCases.completeGame(gameId, professorId);

    return res.status(200).json({
      success: true,
      message: "Game completed successfully",
      data: completedGame
    });
  } catch (error) {
    console.error("[Controller] Error completing game:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { gameId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!gameId) {
      return res.status(400).json({
        success: false,
        error: "Game ID is required"
      });
    }

    const deletedGame = await professorPanelUseCases.deleteGame(gameId, professorId);

    return res.status(200).json({
      success: true,
      message: "Game deleted successfully",
      data: deletedGame
    });
  } catch (error) {
    console.error("[Controller] Error deleting game:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

// ===== TEAM CONTROLLERS =====

const createTeam = async (req, res) => {
  try {
    const { gameId, name, studentIds } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!gameId || !name) {
      return res.status(400).json({
        success: false,
        error: "Game ID and team name are required"
      });
    }

    const newTeam = await professorPanelUseCases.createTeam(
      gameId,
      professorId,
      name,
      studentIds || []
    );

    return res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: newTeam
    });
  } catch (error) {
    console.error("[Controller] Error creating team:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getTeamsByGame = async (req, res) => {
  try {
    const { gameId } = req.query;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!gameId) {
      return res.status(400).json({
        success: false,
        error: "Game ID is required"
      });
    }

    const teams = await professorPanelUseCases.getTeamsByGame(gameId, professorId);

    return res.status(200).json({
      success: true,
      data: teams,
      count: teams.length
    });
  } catch (error) {
    console.error("[Controller] Error getting teams:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getTeam = async (req, res) => {
  try {
    const { teamId } = req.query;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!teamId) {
      return res.status(400).json({
        success: false,
        error: "Team ID is required"
      });
    }

    const team = await professorPanelUseCases.getTeam(teamId, professorId);

    return res.status(200).json({
      success: true,
      data: team
    });
  } catch (error) {
    console.error("[Controller] Error getting team:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { teamId, ...updates } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!teamId) {
      return res.status(400).json({
        success: false,
        error: "Team ID is required"
      });
    }

    const updatedTeam = await professorPanelUseCases.updateTeam(teamId, professorId, updates);

    return res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: updatedTeam
    });
  } catch (error) {
    console.error("[Controller] Error updating team:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const addStudentToTeam = async (req, res) => {
  try {
    const { teamId, studentId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!teamId || !studentId) {
      return res.status(400).json({
        success: false,
        error: "Team ID and student ID are required"
      });
    }

    const updatedTeam = await professorPanelUseCases.addStudentToTeam(teamId, professorId, studentId);

    return res.status(200).json({
      success: true,
      message: "Student added to team successfully",
      data: updatedTeam
    });
  } catch (error) {
    console.error("[Controller] Error adding student to team:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const removeStudentFromTeam = async (req, res) => {
  try {
    const { teamId, studentId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!teamId || !studentId) {
      return res.status(400).json({
        success: false,
        error: "Team ID and student ID are required"
      });
    }

    const updatedTeam = await professorPanelUseCases.removeStudentFromTeam(teamId, professorId, studentId);

    return res.status(200).json({
      success: true,
      message: "Student removed from team successfully",
      data: updatedTeam
    });
  } catch (error) {
    console.error("[Controller] Error removing student from team:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.body;
    const decodedToken = req.user;
    const { userId: professorId } = decodedToken.body;

    if (!teamId) {
      return res.status(400).json({
        success: false,
        error: "Team ID is required"
      });
    }

    const deletedTeam = await professorPanelUseCases.deleteTeam(teamId, professorId);

    return res.status(200).json({
      success: true,
      message: "Team deleted successfully",
      data: deletedTeam
    });
  } catch (error) {
    console.error("[Controller] Error deleting team:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

// ===== TEMPLATE CONTROLLERS =====

const getAvailableTemplates = async (req, res) => {
  try {
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    const templates = await professorPanelUseCases.getAvailableTemplates(institutionId, professorId);

    return res.status(200).json({
      success: true,
      data: templates
    });
  } catch (error) {
    console.error("[Controller] Error getting available templates:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const createBOM = async (req, res) => {
  try {
    const bomData = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    const newBOM = await professorPanelUseCases.createBOM(institutionId, professorId, bomData);

    return res.status(201).json({
      success: true,
      message: "BOM created successfully",
      data: newBOM
    });
  } catch (error) {
    console.error("[Controller] Error creating BOM:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const createEmployeeTemplate = async (req, res) => {
  try {
    const employeeData = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    const newEmployee = await professorPanelUseCases.createEmployeeTemplate(institutionId, professorId, employeeData);

    return res.status(201).json({
      success: true,
      message: "Employee template created successfully",
      data: newEmployee
    });
  } catch (error) {
    console.error("[Controller] Error creating employee template:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const createAssetTemplate = async (req, res) => {
  try {
    const assetData = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    const newAsset = await professorPanelUseCases.createAssetTemplate(institutionId, professorId, assetData);

    return res.status(201).json({
      success: true,
      message: "Asset template created successfully",
      data: newAsset
    });
  } catch (error) {
    console.error("[Controller] Error creating asset template:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const createMaterial = async (req, res) => {
  try {
    const materialData = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    const newMaterial = await professorPanelUseCases.createMaterial(institutionId, professorId, materialData);

    return res.status(201).json({
      success: true,
      message: "Material created successfully",
      data: newMaterial
    });
  } catch (error) {
    console.error("[Controller] Error creating material:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const createProcess = async (req, res) => {
  try {
    const processData = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    const newProcess = await professorPanelUseCases.createProcess(institutionId, professorId, processData);

    return res.status(201).json({
      success: true,
      message: "Process created successfully",
      data: newProcess
    });
  } catch (error) {
    console.error("[Controller] Error creating process:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const createExpenseTemplate = async (req, res) => {
  try {
    const expenseData = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    const newExpense = await professorPanelUseCases.createExpenseTemplate(institutionId, professorId, expenseData);

    return res.status(201).json({
      success: true,
      message: "Expense template created successfully",
      data: newExpense
    });
  } catch (error) {
    console.error("[Controller] Error creating expense template:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const createJob = async (req, res) => {
  try {
    const jobData = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    const newJob = await professorPanelUseCases.createJob(institutionId, professorId, jobData);

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob
    });
  } catch (error) {
    console.error("[Controller] Error creating job:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const createSkill = async (req, res) => {
  try {
    const skillData = req.body;
    const decodedToken = req.user;
    const { institutionId, userId: professorId } = decodedToken.body;

    const newSkill = await professorPanelUseCases.createSkill(institutionId, professorId, skillData);

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: newSkill
    });
  } catch (error) {
    console.error("[Controller] Error creating skill:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

// ===== GAME CONFIGURATION CONTROLLERS =====

const getAllGameConfigurations = async (req, res) => {
  try {
    const configs = await professorPanelUseCases.getAllGameConfigurations();

    return res.status(200).json({
      success: true,
      data: configs,
      count: configs.length
    });
  } catch (error) {
    console.error("[Controller] Error getting game configurations:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getGameConfiguration = async (req, res) => {
  try {
    const { configId } = req.query;

    if (!configId) {
      return res.status(400).json({
        success: false,
        error: "Configuration ID is required"
      });
    }

    const config = await professorPanelUseCases.getGameConfiguration(configId);

    return res.status(200).json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error("[Controller] Error getting game configuration:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const getDefaultConfigs = async (req, res) => {
  try {
    const defaultConfigs = await professorPanelUseCases.getDefaultConfigs();

    return res.status(200).json({
      success: true,
      data: defaultConfigs
    });
  } catch (error) {
    console.error("[Controller] Error getting default configs:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

// ===== INBOX CONTROLLER =====

const getInbox = async (req, res) => {
  try {
    // Placeholder - implement based on your inbox requirements
    return res.status(200).json({
      success: true,
      data: [],
      message: "Inbox functionality to be implemented"
    });
  } catch (error) {
    console.error("[Controller] Error getting inbox:", error);
    
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    
    return res.status(status).json({
      success: false,
      error: message
    });
  }
};

const professorPanelControllers = {
  // Students
  getInstitutionStudents,
  // Classes
  createClass,
  getMyClasses,
  getClass,
  updateClass,
  deleteClass,
  
  // Groups
  createGroup,
  getMyGroups,
  getGroup,
  updateGroup,
  addStudentToGroup,
  removeStudentFromGroup,
  deleteGroup,
  
  // Games
  createGame,
  getMyGames,
  getGame,
  updateGame,
  activateGame,
  pauseGame,
  completeGame,
  deleteGame,
  
  // Teams
  createTeam,
  getTeamsByGame,
  getTeam,
  updateTeam,
  addStudentToTeam,
  removeStudentFromTeam,
  deleteTeam,
  
  // Templates
  getAvailableTemplates,
  createBOM,
  createEmployeeTemplate,
  createAssetTemplate,
  createMaterial,
  createProcess,
  createExpenseTemplate,
  createJob,
  createSkill,
  
  // Game Configurations
  getAllGameConfigurations,
  getGameConfiguration,
  getDefaultConfigs,
  
  // Inbox
  getInbox,
};

export default professorPanelControllers;
