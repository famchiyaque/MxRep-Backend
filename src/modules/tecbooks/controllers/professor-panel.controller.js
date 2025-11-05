import professorPanelUseCases from "../use-cases/admin-panel.use-cases.js";
import sendemailService from "../services/emails/email.service.js";
import generateJWT from "../services/jwt/jwt.js";

const getMyGames = async (req, res) => {
    // simply get all games
}

const getGame = async (req, res) => {
    // simply get a game by id
}

const createGame = async (req, res) => {
    // create a game
}

const getMyGroups = async (req, res) => {
    // simply get all groups
}

const getGroup = async (req, res) => {
    // simply get a group by id
}

const createGroup = async (req, res) => {
    // create a group
}

const getMyClasses = async (req, res) => {
    // simply get all classes
}

const getClass = async (req, res) => {
    // simply get a class by id
}

const createClass = async (req, res) => {
    // create a class
}

const getInbox = async (req, res) => {
    // simply get all inbox messages
}

export const professorPanelControllers = {
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