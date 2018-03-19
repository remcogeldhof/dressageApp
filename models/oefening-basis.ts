export class OefeningBasis {
  //field 
  oefeningBasisId: number;
  naam: string;
  puntId1: number;
  puntId2: number;
  duur: number;

  //constructor 
  constructor(oefeningBasisId: number, naam: string, puntId1: number, puntId2: number, duur: number) {
    this.oefeningBasisId = oefeningBasisId
    this.naam = naam
    this.puntId1 = puntId1
    this.puntId2 = puntId2
    this.duur = duur;
  }
}
