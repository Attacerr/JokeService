// index.js
async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function getText(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.text();
}

async function generateJokes(jokes) {
    let template = await getText('/jokes.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({jokes});
}

async function generateSites(sites) {
    let template = await getText('/sites.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({sites});
}

async function postJoke(){
    let setup = document.querySelector('#setup')
    let punchline = document.querySelector('#punchline')

    let joke = {setup : setup.value,punchline : punchline.value}

    await post('/api/jokes',joke)
    setup.value=""
    punchline.value=""

    let apijokes = await get('/api/jokes');
    let jokes = document.querySelector("#jokes")
    jokes.innerHTML = await generateJokes(apijokes);

}
async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 201) // Created
        throw new Error(respons.status);
    return await respons.json();
}

async function changeSite(){
    let siteSelect = document.querySelector('#otherSites select').value

    if(siteSelect[4]==='s'){
       siteSelect= siteSelect.substring(8)
        
    } else{
        siteSelect= siteSelect.substring(7)
    }

    let jokes = document.querySelector("#jokes")
    try {
        let otherjokes = await get('/api/otherjokes/'+siteSelect)
        jokes.innerHTML = await generateJokes(otherjokes)
    } catch (er) {
        jokes.innerHTML = er
    }
}

async function main() {
    try {
        let apijokes = await get('/api/jokes');
        let jokes = document.querySelector("#jokes")
        jokes.innerHTML = await generateJokes(apijokes);

        let sites = await get('/api/othersites')
        let sitesID = document.querySelector('#otherSites')
        sitesID.innerHTML += await generateSites(sites)
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();