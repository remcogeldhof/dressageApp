import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuLrvPage } from './menu-lrv';

@NgModule({
  declarations: [
    MenuLrvPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuLrvPage),
  ],
  entryComponents: [
    MenuLrvPage
  ]
})
export class MenuLrvPageModule {}
