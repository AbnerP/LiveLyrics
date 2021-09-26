const express = require('express');
const SpotifyAPI = require('spotify-web-api-node');

const app = express();

app.post('/login',(req,res) =>{
    const code = req.body.code
    const SAPI = new SpotifyAPI({
        redirectUri:'http://localhost:4200/',
        clientId: 'a8f1e497744f4535b0a4b6430c20d0a9',
        clientSecret: '3b50dfbbbd3b4b83a30c484e0d516bc2'
    })

    SAPI.authorizationCodeGrant(code).then(data =>{
        res.json({
            accessToken: data.body.access_token,
            refreshToke: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(()=>{
        res.sendStatus(400)
    })

})

