import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/services/spotify.service';

@Component({
  selector: 'app-Lyrics',
  templateUrl: './Lyrics.component.html',
  styleUrls: ['./Lyrics.component.css']
})
export class LyricsComponent implements OnInit {

  constructor(private spotifyService:SpotifyService) { }

  song:string;
  artist:string;
  lyrics:string[];

  ngOnInit() {
    console.log(this.spotifyService.getSongInformation());
    this.spotifyService.getSongInformation();
    this.spotifyService.currentSong.subscribe(s => this.song = s);
    this.spotifyService.currentArtist.subscribe(a => this.artist = a);
    this.spotifyService.currentLyrics.subscribe(l => this.lyrics = l);
    // console.log(this.spotifyService.currentAccessToken);
  }

}
