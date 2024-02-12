import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from '../../service/web-socket.service';

@Component({
  selector: 'app-feed-backs',
  templateUrl: './feed-backs.component.html',
  styleUrl: './feed-backs.component.css'
})
export class FeedBacksComponent implements OnInit,AfterViewInit{
  @ViewChild('inputMessage') inputMessage:ElementRef;
  @ViewChild('envoyer') envoyer:ElementRef;
  @ViewChild('listchat') list_chat:ElementRef;
  @ViewChild('left') left:ElementRef;
  @ViewChild('right') right:ElementRef;
  @ViewChild('page') page:ElementRef;
  @ViewChild('hiddenclone') hiddenclone:ElementRef
  private ShowComment = false;
  constructor(public webSocketService: WebSocketService) {}
  ngAfterViewInit(): void {
    console.log("feedback")
    this.webSocketService.initializeWebSocketConnection(
      this.inputMessage?.nativeElement,
      this.envoyer?.nativeElement,
      this.list_chat?.nativeElement,
      this.left?.nativeElement,
      this.right?.nativeElement,
      this.page?.nativeElement,
      this.hiddenclone.nativeElement)
      
  }
  
  ngOnInit(): void {
  }
  ngOnChanges() {
    
  }
}
