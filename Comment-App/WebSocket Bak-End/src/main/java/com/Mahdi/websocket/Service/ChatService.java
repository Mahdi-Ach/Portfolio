package com.Mahdi.websocket.Service;

import com.Mahdi.websocket.BO.Chat;
import com.Mahdi.websocket.Repository.ChatRepo;
import com.Mahdi.websocket.ServicesInt.ChatServiceInt;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
@Service
@RequiredArgsConstructor
@Transactional
public class ChatService implements ChatServiceInt {
    private final ChatRepo chatRepo;
    @Override
    public Chat save(Chat chat) {

        return chatRepo.save(chat);
    }

    public Pageable createPageable(int pageNumber) {
        return PageRequest.of(pageNumber, 5,Sort.by("id").descending());
    }

    // Example of using the dynamic Pageable in a method
    public Page<Chat> getChats(int pageNumber) {
        Pageable pageable = createPageable(pageNumber);
        System.out.println(chatRepo.findAll());
        // Your logic to retrieve chats using the pageable
        return chatRepo.findAll(pageable);
    }

    @Override
    public Chat getElementbyId(Long id) {
        return chatRepo.findChatById(id);
    }
    @Override
    public Long getLengthChat(){
        return chatRepo.count();
    }
}
