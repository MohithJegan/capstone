import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';
import { UserComponent } from './user.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ViewmovieComponent } from './viewmovie/viewmovie.component';
import { RouteGuard } from '../route.guard';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: '', component: UserComponent,children:[
    {path:"viewmovie",component:ViewmovieComponent,canActivate:[RouteGuard]},
    {path:"movieinfo",component:MovieinfoComponent,canActivate:[RouteGuard]},
    {path:"userprofile",component:UserprofileComponent,canActivate:[RouteGuard]},
    {path:"setting",component:SettingComponent,canActivate:[RouteGuard]},
    {path:'',redirectTo:'viewmovie',pathMatch:'full'}
  ] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
