export class Exercise {
  //field 
  exerciseId: string;
  basicExerciseId: number;
  testId: string;
  description: string;
  pace: string;
  serialNumber: number;
  circleId: number;

  //constructor 
  constructor(exerciseId: string, basicExerciseId: number, testId: string, description: string, pace: string, serialNumber: number, circleId: number) {
    this.exerciseId = exerciseId
    this.basicExerciseId = basicExerciseId
    this.testId = testId
    this.description = description
    this.pace = pace
    this.serialNumber = serialNumber
    this.circleId = circleId;
  }
}
