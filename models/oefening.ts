export class Oefening {
  //field 
  oefeningId: number;
  oefeningBasisId: number;
  proefId: string;
  beschrijving: string;
  gang: string;
  reeksNummer: number;

  //constructor 
  constructor(oefeningId: number, oefeningBasisId: number, proefId: string, beschrijving: string, gang: string, reeksNummer: number) {
    this.oefeningId = oefeningId
    this.oefeningBasisId = oefeningBasisId
    this.proefId = proefId
    this.beschrijving = beschrijving
    this.gang = gang
    this.reeksNummer = reeksNummer
  }
}
