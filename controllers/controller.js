// controller.js
const mongoose = require('mongoose');
const Joke = require('../models/Joke');
const fetch = require('node-fetch')
const jokeserviceURL =  'https://krdo-joke-registry.herokuapp.com/api/services'

const config = require('../config');

mongoose.connect(config.databaseURI, {useNewUrlParser: true, useUnifiedTopology: true});

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

exports.getJokeOtherSite = function (siteUrl) {
    if(siteUrl[siteUrl.lenght]!=="/"){
        siteUrl+="/"
    }
    url = 'https://'+siteUrl+'api/jokes'

    return get(url)
    
};

exports.getJokes = function () {
    return Joke.find().exec();
};

exports.createJoke = function (setup,punchline) {

    return Joke.create({
        setup,
        punchline
    });

};

exports.getOtherSites = function () {
    return get(jokeserviceURL);
};