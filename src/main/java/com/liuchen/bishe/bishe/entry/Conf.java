package com.liuchen.bishe.bishe.entry;

import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * @program: bishe
 * @description: conf
 * @author: liuchen
 * @create: 2020-02-08 17:54
 **/
@Component
public class Conf implements Serializable {

        private  int id;
        private  String key;
        private  String value;

        public Conf() {}

    public Conf(int id, String key, String value) {
        this.id = id;
        this.key = key;
        this.value = value;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }


    @Override
    public String toString() {
        return "Conf{" +
                "id=" + id +
                ", key='" + key + '\'' +
                ", value='" + value + '\'' +
                '}';
    }


}
