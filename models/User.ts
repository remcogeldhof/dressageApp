export class User {
  //field 
  userId: string;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  token: string;


  //constructor 
  constructor(userId: string, firstname: string, lastname:string, mail: string, password: string, token: string) {
    this.userId = userId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.mail = mail;
    this.password = password;
    this.token = token;
  }
}
