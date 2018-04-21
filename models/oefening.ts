export class Oefening {
  //field 
  oefeningId: string;
  oefeningBasisId: number;
  proefId: string;
  beschrijving: string;
  gang: string;
  reeksNummer: number;

  //constructor 
  constructor(oefeningId: string, oefeningBasisId: number, proefId: string, beschrijving: string, gang: string, reeksNummer: number) {
    this.oefeningId = oefeningId
    this.oefeningBasisId = oefeningBasisId
    this.proefId = proefId
    this.beschrijving = beschrijving
    this.gang = gang
    this.reeksNummer = reeksNummer
  }
}
