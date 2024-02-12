package com.Mahdi.websocket.ServicesInt;

import com.Mahdi.websocket.BO.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

public interface ChatServiceInt {
    Chat save(Chat chat);

    Page<Chat> getChats(int page);

    Chat getElementbyId(Long id);
    Long getLengthChat();
}
