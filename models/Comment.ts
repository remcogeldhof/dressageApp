export class Comment {
  //field 
  commentId: string;
  userId: string;
  testId: string;
  firstname: string;
  lastname: string;
  comment: string;
  date: string;


  //constructor 
  constructor(commentId: string, userId: string, testId: string, firstname: string, lastname:string, comment: string, date: string) {
    this.commentId = commentId
    this.userId = userId
    this.testId = testId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.comment = comment
    this.date = date;
  }
}
