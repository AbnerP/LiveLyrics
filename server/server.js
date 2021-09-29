const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyAPI = require('spotify-web-api-node');
const Lyrics = require('song-lyrics-api');
const e = require('express');
const lyrics = new Lyrics();


const app = express();

token = "";
artist = "";
song = "";

const spotifyApi = new SpotifyAPI({
    redirectUri:'http://localhost:4200/',
    clientId: 'a8f1e497744f4535b0a4b6430c20d0a9',
    clientSecret: '3b50dfbbbd3b4b83a30c484e0d516bc2',
});

const scopes = [
    'streaming',
    'user-read-currently-playing',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-modify-playback-state'
];

app.use(cors());
app.use(bodyParser.json());


app.post('/login',(req,res) =>{
    token = req.body.code

    spotifyApi.authorizationCodeGrant(token).then(data =>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
        spotifyApi.setAccessToken(data.body.access_token);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(400)
    })
});

app.get('/currentSong',(req,res) =>{
  //spotifyApi.setAccessToken(data.body.access_token);
  //console.log("Access token at currentSong"+spotifyApi.getAccessToken())
  lyr = [];
  spotifyApi.getMyCurrentPlayingTrack()
      .then(function(data) {
        // res.json({
        //   item:data.body.item
        // })
        song = data.body.item.name;
        artist = data.body.item.artists[0].name;
        
        lyrics.getLyrics(song)
          .then((response) => {
            // console.log(response);
            for (var i = 0; i < response.length; i++) {
              if(response[i]['title'] == song){
                console.log(response[i]);
                l = response[i]['lyrics']['lyrics'];
                lyr = l.split("\n");
                res.json({
                  a:artist,
                  s:song,
                  l:lyr
                })
              }
            }
          })
          .catch((error) => {
              return console.log(error);
          })
        console.log(song+" by "+artist);
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  console.log(res.body);
  
  return res;
});



app.post('/refresh',(req,res)=>{
    const refreshToken = req.body.refreshToken;
    spotifyApi.refreshAccessToken().then((data)=>{
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
      })
      console.log("The access token has been refreshed!");
      spotifyApi.setAccessToken(data.body['access_token']);
    }).catch((err)=>{
        console.log(err)
    });

});

app.listen(4201, () =>{
    console.log("listening on http://localhost:4201")
})

async function AuthorizeGeniusAPI() {
  const client = new AuthorizationCode(config);

  const authorizationUri = client.authorizeURL({
    redirect_uri: geniusAPI.redirectUri,
    scope: '<scope>',
    state: '<state>'
  });

  // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
  res.redirect(authorizationUri);

  const tokenParams = {
    code: '<code>',
    redirect_uri: 'http://localhost:3000/callback',
    scope: '<scope>',
  };

  try {
    const accessToken = await client.getToken(tokenParams);
  } catch (error) {
    console.log('Access Token Error', error.message);
  }
}

