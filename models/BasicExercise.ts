export class BasicExercise {
  //field 
  basicExerciseId: number;
  name: string;
  pointId1: number;
  pointId2: number;
  duration: number;
  //constructor 
  constructor(basicExerciseId: number, name: string, pointId1: number, pointId2: number, duration: number) {
    this.basicExerciseId = basicExerciseId
    this.name = name
    this.pointId1 = pointId1
    this.pointId2 = pointId2
    this.duration = duration;
  }
}
