const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyAPI = require('spotify-web-api-node');
const Lyrics = require('song-lyrics-api');
const e = require('express');
const { urlencoded } = require('body-parser');
const lyrics = new Lyrics();


const app = express();

const spotifyApi = new SpotifyAPI({
    redirectUri:'http://localhost:4200/',
    clientId: 'a8f1e497744f4535b0a4b6430c20d0a9',
    clientSecret: '3b50dfbbbd3b4b83a30c484e0d516bc2',
});

authURL = 'https://accounts.spotify.com/authorize?client_id=a8f1e497744f4535b0a4b6430c20d0a9&redirect_uri=http://localhost:4200/&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-read-currently-playing'

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

app.get('/ouathURL',(req,res)=>{
  res.json({
    url:authURL
  });
  return res;
});

app.get('/currentSong',(req,res) =>{
  lyr = [];
  spotifyApi.getMyCurrentPlayingTrack()
      .then(function(data) {
        song = data.body.item.name;
        artist = data.body.item.artists[0].name;
        
        lyrics.getLyrics(song)
          .then((response) => {
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




// app.post('/refresh',(req,res)=>{
//     const refreshToken = req.body.refreshToken;
//     spotifyApi.refreshAccessToken().then((data)=>{
//       res.json({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//       })
//       console.log("The access token has been refreshed!");
//       spotifyApi.setAccessToken(data.body['access_token']);
//     }).catch((err)=>{
//         console.log(err)
//     });
// });

app.listen(4201, () =>{
    console.log("listening on http://localhost:4201")
})
