package com.liuchen.bishe.bishe.vo;

import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * @program: bishe
 * @description: address地址
 * @author: liuchen
 * @create: 2020-02-09 18:19
 **/

@Component
public class AddressVo  implements Serializable {
   private int id;
   private String text;
   private int Pid;

   public AddressVo() {}

    public AddressVo(int id, String text, int pid) {
        this.id = id;
        this.text = text;
        Pid = pid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getPid() {
        return Pid;
    }

    public void setPid(int pid) {
        Pid = pid;
    }

    @Override
    public String toString() {
        return "AddressVo{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", Pid=" + Pid +
                '}';
    }
}
