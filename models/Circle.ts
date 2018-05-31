export class Circle {
  //field
  circleId: number;
  direction: string;
  radius: number;
  height: number;
  hand: string;
  //constructor 
  constructor(circleId: number, direction: string, radius: number, height: number, hand: string) {
    this.circleId = circleId
    this.direction = direction;
    this.radius = radius
    this.height = height
    this.hand = hand
  }
}
