import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Comment } from '../models/comment';


export class CommentController {

  private static commentList: Comment[] = [];
 

  public static loadCommentsByProefID(http, storage, proefId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    http.get('http://localhost/dressageapi/comment/getby.php', proefId, headers).map(res => res.json().records).subscribe((data) => {
      this.commentList = data;
      storage.set('commentList', this.commentList);
          console.log("Comments loaded");
        },
          (error: any) => {
            console.dir(error);
          });
  }

  public static createComment(http, storage, comment) {
    let body = JSON.stringify(comment);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    http.post('http://localhost/dressageapi/comment/create.php', body, headers).map(res => res.json()).subscribe(data => {
        console.log(data);
      });
  }

}
