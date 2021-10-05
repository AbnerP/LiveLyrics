import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  beURL = 'http://localhost:4201'

  private code = new BehaviorSubject<string>("");
  currentCode = this.code.asObservable();

  private accessToken = new BehaviorSubject<string>("");
  currentAccessToken = this.accessToken.asObservable();

  private refreshToken = new BehaviorSubject<string>("");
  currentRefresjToken = this.refreshToken.asObservable();

  private expiresIn = new BehaviorSubject<string>("");
  currentExpiresIn = this.expiresIn.asObservable();

  private song = new BehaviorSubject<string>("");
  currentSong = this.song.asObservable();
  private artist = new BehaviorSubject<string>("");
  currentArtist = this.artist.asObservable();
  private lyrics = new BehaviorSubject<string[]>([]);
  currentLyrics = this.lyrics.asObservable();


  authURL = 'https://accounts.spotify.com/authorize?client_id=a8f1e497744f4535b0a4b6430c20d0a9&redirect_uri=http://localhost:4200/&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-read-currently-playing'

  constructor() { }

  getAccessToken(code:string){
    axios.post(this.beURL+'/login',{
      code
    }).then(res => {
      this.accessToken = res.data.accessToken;
      this.refreshToken = res.data.refreshToken;
      this.expiresIn = res.data.expiresIn;
    }).catch(err => console.log(err))
    return this.accessToken;
  }

  getSongInformation(){
    axios.get(this.beURL+'/currentSong')
    .then(res => {
      console.log(res.data.i);
      this.song.next(res.data.s);
      this.artist.next(res.data.a);
      this.lyrics.next(res.data.l);
    })
    .catch(err => console.log(err))
  }

}
