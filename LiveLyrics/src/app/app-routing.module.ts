import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/Login.component';
import { DisplayerComponent } from './Displayer/Displayer.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'lyrics',component:DisplayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
