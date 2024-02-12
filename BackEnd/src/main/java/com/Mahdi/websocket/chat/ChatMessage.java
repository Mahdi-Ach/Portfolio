package com.Mahdi.websocket.chat;

import com.Mahdi.websocket.BO.MessageType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {

    private MessageType type;
    private String content;
    //private String sender;

}
