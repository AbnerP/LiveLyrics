using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LiveLyricsAPI.Controllers
{
    [ApiController]
    [Route("/api/spotify")]
    public class SpotifyAPI : ControllerBase
    {
        private static readonly string spotifyAuthorizeURL = "https://accounts.spotify.com/authorize?client_id=a8f1e497744f4535b0a4b6430c20d0a9&response_type=code&redirect_uri=http://localhost:4200&scope=streaming%20user-read-currently-playing%20user-read-email%20user-read-private%20user-library-read%20user-modify-playback-state";

        private readonly ILogger<SpotifyAPI> _logger;

        public SpotifyAPI(ILogger<SpotifyAPI> logger)
        {
            _logger = logger;
        }

        //[HttpGet]
        //public IEnumerable<SpotifyAPI> Get()
        //{
            
        //}
    }
}
