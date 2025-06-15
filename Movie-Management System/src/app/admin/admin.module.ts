import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewmovieComponent } from './viewmovie/viewmovie.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RestoremovieComponent } from './restoremovie/restoremovie.component';
import { EditmovieComponent } from './editmovie/editmovie.component';
import { FormsModule } from '@angular/forms';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';

@NgModule({
  declarations: [
    AdminComponent,
    ViewmovieComponent,
    AddmovieComponent,
    DeletemovieComponent,
    RestoremovieComponent,
    EditmovieComponent,
    MovieinfoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    FormsModule,
  ],
  exports:[
    AdminComponent
  ]
})
export class AdminModule { }
