package com.liuchen.bishe.bishe.entry;

import org.springframework.stereotype.Component;

import javax.xml.ws.handler.MessageContext;
import java.io.Serializable;

/**
 * @program: bishe
 * @description: score
 * @author: liuchen
 * @create: 2020-02-08 17:39
 **/
@Component
public class Score implements Serializable {
    private int id;
    private  int customerId;
    private int score;
    private  int isDelete;

    public Score(){}

    public Score(int id, int customerId, int score, int isDelete) {
        this.id = id;
        this.customerId = customerId;
        this.score = score;
        this.isDelete = isDelete;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
    }

    @Override
    public String toString() {
        return "Score{" +
                "id=" + id +
                ", customerId=" + customerId +
                ", score=" + score +
                ", isDelete=" + isDelete +
                '}';
    }
}
