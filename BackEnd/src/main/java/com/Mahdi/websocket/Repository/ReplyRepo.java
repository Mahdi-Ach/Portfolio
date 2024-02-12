package com.Mahdi.websocket.Repository;

import com.Mahdi.websocket.BO.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepo extends JpaRepository<Reply, Long> {
    List<Reply> findAllByChatId(Long id);
}
