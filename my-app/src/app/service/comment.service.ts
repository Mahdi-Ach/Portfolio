import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplyService } from './reply.service';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient,private Servicereply:ReplyService) { }
  //Send Comment Message
  sendMessage(messageContent,websocketservice:WebSocketService) {
    var message = { content: messageContent ,type:"CHAT"};
    websocketservice.stompClient.send('/app/chat', {}, JSON.stringify(message));
    websocketservice.inputMessage.value= ''
  }

  //Create a new Comment in List of Comments
  create_newdivcomment(data,websocketservice:WebSocketService,append=true){
    let dupNode = websocketservice.list_chat.nextElementSibling.cloneNode(true);
    dupNode.className = ""
    dupNode.firstElementChild.innerHTML = data
    dupNode.lastElementChild.firstElementChild.addEventListener("click",(e)=>{this.Servicereply.see_replies(e,websocketservice)})
    if(append){
      websocketservice.list_chat.appendChild(dupNode)
        return
    }
    websocketservice.list_chat.prepend(dupNode)
  }

  //Display message Comment
  commentservice(numpage, websocketservice: WebSocketService) {
    this.http.get("http://localhost:8080/list-chat?page=" + numpage).subscribe({
      next:(value:any)=>{
        let body = {
          content: value.content,
          totalElements: value.totalElements,
          totalPages: value.totalPages,
          number: value.number
        };
        console.log(body);
        this.loadComment(body, websocketservice);
      },
      error: (error) => { },
      complete: () => { }
    });
  }
  
  
  loadComment(res,websocketservice:WebSocketService){
      websocketservice.list_chat.innerHTML = ""
      websocketservice.numpage = res.number;
      websocketservice.totalPages = res.totalPages;
      websocketservice.totalElements = res.totalElements
      res.content.forEach(element => {
          this.create_newdivcomment(element.content,websocketservice)
      });
  }
}
