import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuInternationaalPage } from '../menu-internationaal/menu-internationaal';


@NgModule({
  declarations: [
    MenuInternationaalPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuInternationaalPage),
  ],
  entryComponents: [
    MenuInternationaalPage
  ]
})
export class MenuInternationaalPageModule {}

