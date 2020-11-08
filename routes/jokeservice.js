// company.js
const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router
    .get('/jokes', async (request, response) => {
        try {
            let beskeder = await controller.getJokes();
            response.json(beskeder);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .get('/otherjokes/:site', async (request, response) => {
        try {
            let { site } = request.params;
            
            let otherjokes = await controller.getJokeOtherSite(site);
            response.json(otherjokes);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .get('/othersites', async (request, response) => {
        try {
            let othersites = await controller.getOtherSites();
            response.json(othersites);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .post('/jokes', async (request, response) => {
        function ok(input) { return (input && input.length > 2) }
        let { setup, punchline} = request.body;
        if (ok(setup) && ok(punchline)) {
            let joke = await controller.createJoke(setup,punchline)
            response.status(201).json({ resultat: 'Joke gemt!' })
        } else {
            response.status(406).send('For lidt tekst!');
        };
    })
    

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;