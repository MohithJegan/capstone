import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewmovieComponent } from '../user/viewmovie/viewmovie.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AdminComponent } from './admin.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { RestoremovieComponent } from './restoremovie/restoremovie.component';
import { RouteGuard } from '../route.guard';
import { EditmovieComponent } from './editmovie/editmovie.component';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';

const routes: Routes = [
  { path: '', component: AdminComponent,children:[
    { path:'viewmovie',component:ViewmovieComponent,canActivate:[RouteGuard]},
    {path:"movieinfo",component:MovieinfoComponent,canActivate:[RouteGuard]},
    { path:'addmovie',component:AddmovieComponent,canActivate:[RouteGuard]},
    { path: 'editmovie', component: EditmovieComponent,canActivate:[RouteGuard]},
    {path:'deletemovie',component:DeletemovieComponent,canActivate:[RouteGuard]},
    {path:'restoremovie',component:RestoremovieComponent,canActivate:[RouteGuard]},
    {path:'',redirectTo:'viewmovie',pathMatch:'full'}
  ] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
