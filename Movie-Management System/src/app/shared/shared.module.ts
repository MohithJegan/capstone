import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SearchpipePipe } from '../searchpipe.pipe';

@NgModule({
  declarations: [
    SearchpipePipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    SearchpipePipe
  ]
})
export class SharedModule { }
