const session = require('express-session');
const Keycloak = require('keycloak-connect');
const express = require('express');

const app = express();
const memoryStore = new session.MemoryStore();

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUnintialized: true,
    store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

app.get('/complain', keycloak.protect(), function(req, res) {
    const {access_token} = JSON.parse(req.session['keycloak-token']);

    res.send(access_token);

})

app.listen(3000, function() { console.log('App listening') })
