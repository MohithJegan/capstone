import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreComponent } from './genre/genre.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NopageComponent } from './nopage/nopage.component';
import { SignupComponent } from './signup/signup.component';
import { RouteGuard } from './route.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'genre',component:GenreComponent},
  {path:'footer',component:FooterComponent},

  
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate:[RouteGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[RouteGuard] },
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:"**",component:NopageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
