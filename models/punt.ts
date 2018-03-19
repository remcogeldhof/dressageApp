export class Punt {
  //field 
  puntId: number;
  naam: string;
  posLeft: number;
  posTop: number;

  //constructor 
  constructor(puntId: number, naam: string, posLeft: number, posTop: number) {
    this.puntId = puntId
    this.naam = naam
    this.posLeft = posLeft
    this.posTop = posTop
  }
}
