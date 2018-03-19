import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateExercisesPage } from './create-exercises';

@NgModule({
  declarations: [
    CreateExercisesPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateExercisesPage),
  ],
})
export class CreateExercisesPageModule {}
