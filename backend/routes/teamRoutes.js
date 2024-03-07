const express = require('express');
const router = express.Router();
const { BadRequestError } = require('../util/expressError')

const { ensureLoggedIn, ensureAdmin } = require('../middleware/auth');
const teamService = require('../service/teamService');

//teams //post a team for a user
router.post('/', ensureLoggedIn, async (req, res, next) => {
    const user_id = res.locals.user.id
    try {
        const { response, errors, message, teams } = await teamService.addTeam(user_id, req.body);

        if (response) {
            return res.status(201).json({
                message,
                teams
            })
        } else {
            throw new BadRequestError(errors);
        }
    } catch (err) {
        return next(err);
    }
});

//teams get all teams for a user
router.get('/', ensureLoggedIn, async (req, res, next) => {
    const user_id = res.locals.user.id
    try {
        const { response, message, teams } = await teamService.viewMyTeams(user_id);

        if (response) {
            return res.status(200).json({
                message,
                teams
            })
        } else {
            return res.status(200).json({
                message
            })
        }
    } catch (err) {
        return next(err);
    }
});

//view a team by team_id
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
    const team_id = req.params.id;
    const user_id = res.locals.user.id
    try {
        const { response, message, team } = await teamService.viewTeamById(user_id, team_id);

        if (response) {
            return res.status(200).json({
                message,
                team
            })
        } else {
            return res.status(200).json({
                message
            })
        }
    } catch (err) {
        return next(err);
    }
});

//Add a pokemon to a team 
router.post('/addPokemon', ensureLoggedIn, async (req, res, next) => {
    const user_id = res.locals.user.id

    try {
        const { response, errors, message, pokemon } = await teamService.addPokemonToTeam(user_id, req.body);
        if (response) {
            return res.status(201).json({
                message,
                pokemon
            })
        } else {
            res.status(400).json({
                message,
                errors
            })
        }
    } catch (err) {
        return next(err);
    }
});


module.exports = router; 