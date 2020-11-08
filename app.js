// app.js
const express = require('express');
const app = express();
const config = require('./config');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/api', require('./routes/jokeservice'));


post('https://krdo-joke-registry.herokuapp.com/api/services',
{name : "The Laughing Giraffe",
address : "https://the-laughing-giraffe.herokuapp.com",
secret : "reallyStrongpwd"})


const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app; // test


async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 200) // Created
        throw new Error(respons.status);
    return await respons.json();
}