import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService:SpotifyService,private route:ActivatedRoute, private router:Router) { }

  authURL = 'https://accounts.spotify.com/authorize?client_id=a8f1e497744f4535b0a4b6430c20d0a9&response_type=code&redirect_uri=http://localhost:4200/&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-read-currently-playing';
  //authURL = 'https://accounts.spotify.com/authorize?client_id=&response_type=code&redirect_uri=http://localhost:4200/&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-read-currently-playing';
  code:string;
  ngOnInit() {
    this.code = this.route.snapshot.queryParamMap.get('code');
    this.spotifyService.getAccessToken(this.code);
    if(this.code){
      this.router.navigate(['/lyrics'])
    }
  }

}
