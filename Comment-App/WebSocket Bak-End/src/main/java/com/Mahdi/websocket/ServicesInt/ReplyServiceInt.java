package com.Mahdi.websocket.ServicesInt;

import com.Mahdi.websocket.BO.Reply;

import java.util.HashMap;
import java.util.List;

public interface ReplyServiceInt {
    Reply save(Reply reply,Long id);
    List<Reply> getReplybyChatId(Long id);
    HashMap<String,Object> Reply_Response(Reply reply, Long id);
}
