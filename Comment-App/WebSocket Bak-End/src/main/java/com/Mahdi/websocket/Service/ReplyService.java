package com.Mahdi.websocket.Service;

import com.Mahdi.websocket.BO.Chat;
import com.Mahdi.websocket.BO.Reply;
import com.Mahdi.websocket.Repository.ReplyRepo;
import com.Mahdi.websocket.ServicesInt.ChatServiceInt;
import com.Mahdi.websocket.ServicesInt.ReplyServiceInt;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReplyService implements ReplyServiceInt {
    private final ReplyRepo replyRepo;
    private final ChatServiceInt chatServiceInt;

    @Override
    public Reply save(Reply reply,Long id) {
        System.out.println(id);
        Chat chat = chatServiceInt.getElementbyId(id);
        reply.setChat(chat);
        Reply reply1 = replyRepo.save(reply);
        System.out.println("i m un reply");
        System.out.println(reply1);
        return reply1;
    }
    @Override
    public HashMap<String,Object> Reply_Response(Reply reply,Long id){
        HashMap<String,Object> detail_reply = new HashMap<>();
        detail_reply.put("chat_id",id);
        detail_reply.put("reply",save(reply,id));
        return detail_reply;
    }
    @Override
    public List<Reply> getReplybyChatId(Long id) {
        Chat chat = chatServiceInt.getElementbyId(id);

        return chat.getReplies();
    }
}
