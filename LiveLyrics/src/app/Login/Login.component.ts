import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  AUTH_URL = "https://accounts.spotify.com/authorize?client_id=a8f1e497744f4535b0a4b6430c20d0a9&response_type=code&redirect_uri=http://localhost:4200/&scope=streaming%20user-read-currently-playing%20user-read-email%20user-read-private%20user-library-read%20user-modify-playback-state";
  constructor() { }

  ngOnInit() {
  }

}
