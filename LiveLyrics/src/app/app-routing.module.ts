import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/Login.component';
import { LyricsComponent } from './Lyrics/Lyrics.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'lyrics',component:LyricsComponent},
  {path:'*',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
