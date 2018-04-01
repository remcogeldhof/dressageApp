export class Gebruiker {
  //field 
  gebruikersId: string;
  gebruikersnaam: string;
  wachtwoord: string;
  email: string;
  voornaam: string;
  achternaam: string;

  //constructor 
  constructor(gebruikersId: string, gebruikersnaam: string, wachtwoord:string, email: string, voornaam: string, achternaam:string) {
    this.gebruikersId = gebruikersId;
    this.gebruikersnaam = gebruikersnaam;
    this.wachtwoord = wachtwoord;
    this.email = email;
    this.voornaam = voornaam;
    this.achternaam = achternaam;
  }

}
