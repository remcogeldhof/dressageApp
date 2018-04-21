export class Comment {
  //field 
  commentId: string;
  userId: string;
  proefId: string;
  comment: string;

  //constructor 
  constructor(commentId: string, userId: string, proefId: string, comment: string) {
    this.commentId = commentId
    this.userId = userId
    this.proefId = proefId;
    this.comment = comment
  }
}
