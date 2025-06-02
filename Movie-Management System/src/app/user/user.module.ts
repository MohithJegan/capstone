import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ViewmovieComponent } from './viewmovie/viewmovie.component';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserprofileComponent } from './userprofile/userprofile.component';

import { SearchPipe } from './search.pipe';
import { SettingComponent } from './setting/setting.component';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [
    UserComponent,
    ViewmovieComponent,
    MovieinfoComponent,
    UserprofileComponent,
    SearchPipe,
    SettingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
