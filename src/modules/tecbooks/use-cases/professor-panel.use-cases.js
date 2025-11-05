import userService from "../services/models/user.service.js";
import gameService from "../services/models/game.service.js";
import groupService from "../services/models/group.service.js";
import classService from "../services/models/class.service.js";
import { BadRequestError, NotFoundError } from "#src/utils/errors/AppError.js";

const getMyGames = async (userId) => {
    const games = await gameService.getMyGames(userId);
    return games;
}

const getGame = async (gameId) => {
    const game = await gameService.getGame(gameId);
    return game;
}

const createGame = async (game) => {
    const newGame = await gameService.createGame(game);
    return newGame;
}

const getMyGroups = async (userId) => {
    const groups = await groupService.getMyGroups(userId);
    return groups;
}

const getGroup = async (groupId) => {
    const group = await groupService.getGroup(groupId);
    return group;
}

const createGroup = async (group) => {
    const newGroup = await groupService.createGroup(group);
    return newGroup;
}

const getMyClasses = async (userId) => {
    const classes = await classService.getMyClasses(userId);
    return classes;
}

const getClass = async (classId) => {
    const _class = await classService.getClass(classId);
    return _class;
}

const createClass = async (_class) => {
    const newClass = await classService.createClass(_class);
    return newClass;
}

const getInbox = async (userId) => {
    return "Coming soon"
}

const professorPanelUseCases = {
    getMyGames,
    getGame,
    createGame,
    getMyGroups,
    getGroup,
    createGroup,
    getMyClasses,
    getClass,
    createClass,
    getInbox,
}

export default professorPanelUseCases;