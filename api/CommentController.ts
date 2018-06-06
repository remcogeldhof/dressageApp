 import { Comment } from '../models/Comment';

export class CommentController{

  public static commentList: Comment[] = [];
 
  public static loadCommentsByProefID(http, storage, testId) {
    this.commentList = null;
    console.log(testId);
    http.get('http://10.3.50.51/api/comment/getBy.php?testId='+testId).map(res => res.json().records).subscribe((data) => {
      console.log(data);
      this.commentList = data;
      storage.set('commentList', this.commentList);
      console.log("Comments loaded");
    },
      (error: any) => {
        console.dir(error);
      });
  }
 

  public static createComment(http, comment: Comment) {
    console.log(comment);
    //this.commentList.unshift(comment);
    let body = JSON.stringify(comment);
    console.log(body);
     
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    http.post('http://10.3.50.51/api/comment/create.php', body, headers).map(res => res.json()).subscribe(data => {
        console.log(data);
      });
  }

}


    //LOCAL localhost/dressageapi/comment/getBy.php?testId= localhost/dressageapi/comment/create.php
    //API 10.3.50.51/api/comment/create.php 10.3.50.51/api/comment/getBy.php?testId=1
