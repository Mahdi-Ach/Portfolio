package com.Mahdi.websocket.BO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Chat {

    @Id
    @GeneratedValue
    private Long id;
    private String content;
    @Enumerated(EnumType.ORDINAL)
    private MessageType type;
    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Reply> replies = new ArrayList<>();
}
