package com.Mahdi.websocket.chat;

import com.Mahdi.websocket.BO.Chat;
import com.Mahdi.websocket.BO.Reply;
import com.Mahdi.websocket.ServicesInt.ChatServiceInt;
import com.Mahdi.websocket.ServicesInt.ReplyServiceInt;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class ChatController {
    private final ChatServiceInt chatServiceInt;
    private final ReplyServiceInt replyServiceInt;
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Chat handleChatMessage(Chat message) {
        chatServiceInt.save(message);
        return message;
    }
    @MessageMapping("/reply/{id}")
    @SendTo("/topic/reply_messages")
    public HashMap<String,Object> handleReplyMessage(Reply reply,@DestinationVariable Long id) {;
        return replyServiceInt.Reply_Response(reply,id);
    }
    @SendTo("/topic/public")
    public String handleReplyMessage() {;
        return "Disconnected";
    }
    @GetMapping("/list-chat")
    public ResponseEntity<Page<Chat>> LoadMessage(@RequestParam(defaultValue = "0") int page){
        return ResponseEntity.ok(chatServiceInt.getChats(page));
    }
    @GetMapping("/reply/{id}")
    public ResponseEntity<List<Reply>> LoadReplyMessages(@PathVariable Long id){
        return ResponseEntity.ok(replyServiceInt.getReplybyChatId(id));
    }
    @GetMapping("/num-chat")
    public ResponseEntity<HashMap<String,Long>> getChatLength(){
        HashMap<String,Long> a = new HashMap<>();
        a.put("totalPages", chatServiceInt.getLengthChat());
        return ResponseEntity.ok(a);
    }
}