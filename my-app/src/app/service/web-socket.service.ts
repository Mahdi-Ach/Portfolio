import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { CommentService } from './comment.service';
import { ReplyService } from './reply.service';
import { error } from 'node:console';
import getCommentIndex from '../Utilities/RetrieveKeyByValue';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService{
  public stompClient = null;
  public socket = null;
  public inputMessage = null;
  public envoyer = null;
  public list_chat = null;
  public hiddenclone = null;
  public left = null;
  public right = null;
  public page = null;
  public numpage = 0;
  public totalPages = 0;
  public remove_clone = true
  public totalElements = null
  public index = null
  public id_mesage = null;
  public ShowComments = false
  constructor(
    private Servicereply:ReplyService,
    private Commentservice:CommentService,
    ){}
  initializeWebSocketConnection(inputMessage: any,envoyer: any,list_chat: any,left: any,right: any,page:any,hiddenclone:any): void {
    this.socket = new SockJS('http://localhost:8080/ws')
    this.stompClient = Stomp.over(this.socket)
    this.inputMessage = inputMessage;
    this.envoyer = envoyer;
    this.list_chat = list_chat;
    this.hiddenclone = hiddenclone;
    this.left = left;
    this.right = right;
    this.page = page;
    this.stompClient.connect({}, (frame:any)=> {
      console.log("eza")
      this.Commentservice.commentservice(0,this)
      this.stompClient.subscribe('/topic/messages', (receivedMessage)=> {
        if(this.numpage != 0){
          return;
            }
            if(this.numpage == 0 && this.list_chat.children.length>=5 ){
                this.list_chat.lastElementChild.remove()
                this.totalPages+=2
            }
            let data = JSON.parse(receivedMessage.body);
            this.Commentservice.create_newdivcomment(data.content,this,false)
            this.totalElements = data.id
          });
          this.stompClient.subscribe('/topic/reply_messages', (receivedMessage)=> {
            console.log("***")
            console.log(this.totalElements)
            console.log(this.numpage)
            console.log(this.index)
            this.index = getCommentIndex(document.querySelectorAll(".list-replies"),document.querySelector(".current"))
            console.log(this.index)
            let data = JSON.parse(receivedMessage.body);
            if(data.chat_id == this.totalElements-(5*(this.numpage)+parseInt(this.index))){
                this.Servicereply.create_newreplys(data.reply)
            }
          })
          this.stompClient.subscribe('/topic/public', (receivedMessage)=> {
            console.log("--------------------")
          })
    });
    
    this.envoyer.addEventListener("click",()=>{
      this.Commentservice.sendMessage(inputMessage.value,this)
      inputMessage.value= ''
    })
    this.left.addEventListener("click", (e: any)=>{
        if(parseInt(page.innerHTML) <= 1){
            return;
        }
        list_chat.innerHTML = ""
        page.innerHTML = parseInt(page.innerHTML) - 1
        this.Commentservice.commentservice(parseInt(page.innerHTML)-1,this)
    })
    this.right.addEventListener("click", (e: any)=>{
        if(parseInt(page.innerHTML) >= this.totalPages){
            return;
        }
        list_chat.innerHTML = ""
        this.Commentservice.commentservice(page.innerHTML,this)
        page.innerHTML = parseInt(page.innerHTML) + 1;
    })
  }
}
