import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuVlpPage } from './menu-vlp';

@NgModule({
  declarations: [
    MenuVlpPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuVlpPage),
  ],
  entryComponents: [
    MenuVlpPage
  ]

})
export class MenuVlpPageModule {}
