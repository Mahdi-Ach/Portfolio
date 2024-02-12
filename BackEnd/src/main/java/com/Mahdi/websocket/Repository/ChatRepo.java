package com.Mahdi.websocket.Repository;

import com.Mahdi.websocket.BO.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepo extends JpaRepository<Chat,Long> {
    Page<Chat> findAll(Pageable pageable);
    Chat findChatById(Long id);
}
