export class User {
  //field 
  userId: string;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;

  //constructor 
  constructor(userId: string, firstname: string, lastname:string, mail: string, password: string) {
    this.userId = userId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.mail = mail;
    this.password = password;
  }
}
