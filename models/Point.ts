export class Point {
  //field 
  pointId: number;
  name: string;
  posLeft: number;
  posTop: number;

  //constructor 
  constructor(pointId: number, name: string, posLeft: number, posTop: number) {
    this.pointId = pointId
    this.name = name
    this.posLeft = posLeft
    this.posTop = posTop
  }

  toString() {
    return this.pointId + this.name + this.posLeft + this.posTop;
  }
}
