import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import getCommentIndex from '../Utilities/RetrieveKeyByValue';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(private http:HttpClient) { }
  replieservice(id){
    this.http.get("http://localhost:8080/reply/"+id).subscribe({
      next:(data:any)=>{
        data.forEach((reply)=>{
          this.create_newreplys(reply)
      })
      },
      error:(error)=>{},
      complete:()=>{}
    }
    )
  } 

  //Send Reply Message
  sendReplyMessage(messageContent,id,websocketservice:WebSocketService) {
    var message = { replymsg: messageContent ,type:"CHAT"};
    websocketservice.stompClient.send('/app/reply/'+id, {}, JSON.stringify(message));
  }

  //See Replies
  see_replies(e,websocketservice:WebSocketService){
    if(e.target.nextElementSibling == document.querySelector(".current")){
        e.target.nextElementSibling.classList.toggle("show-replyinput")
        return;
    }
    if(document.querySelector(".show-replyinput > *:not(:first-child)")){
        document.querySelector(".show-replyinput > *:not(:first-child)").innerHTML = ""
    }
    document.querySelector(".current")?.classList.remove("current","show-replyinput")
    e.target.nextElementSibling.classList.add("current","show-replyinput")
    e.target.nextElementSibling.addEventListener("keydown",(e)=>{this.send_reply(e,websocketservice)})
    websocketservice.index = getCommentIndex(document.querySelectorAll(".list-replies"),e.target.nextElementSibling)
    websocketservice.id_mesage = websocketservice.totalElements-(5*(websocketservice.numpage)+parseInt(websocketservice.index))
    this.replieservice(websocketservice.id_mesage)
  }
  //adding new reply
  create_newreplys(data){
    if(!document.querySelector(".show-replyinput")){
        return
    }
    let para = document.createElement("p")
    para.innerHTML = data.replymsg
    document.querySelector(".show-replyinput").lastElementChild.appendChild(para)
  }
  send_reply(e,websocketservice:WebSocketService){
    if(e.key == "Enter"){
      websocketservice.index = getCommentIndex(document.querySelectorAll(".replies input"),e.target)
      this.sendReplyMessage(e.target.value,websocketservice.id_mesage,websocketservice)
        return;
    }
  }
}
