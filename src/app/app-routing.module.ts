import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTestComponent } from './user-test/user-test.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/log', pathMatch: 'full' },
  { path: 'log', component:LoginComponent },
  { path: 'userTest', component:UserTestComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
