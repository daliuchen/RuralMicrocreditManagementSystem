package com.liuchen.bishe.bishe.vo;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Arrays;

/**
 * @program: bishe
 * @description: 用户照片
 * @author: liuchen
 * @create: 2020-02-13 12:31
 **/
@Component
public class CustomerPictureVo implements Serializable {
    private String idCard;
    private byte[] picture;
    private  byte[]idPicture;

    public CustomerPictureVo(){}

    public CustomerPictureVo(String idCard, byte[] picture, byte[] idPicture) {
        this.idCard = idCard;
        this.picture = picture;
        this.idPicture = idPicture;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public byte[] getIdPicture() {
        return idPicture;
    }

    public void setIdPicture(byte[] idPicture) {
        this.idPicture = idPicture;
    }

    @Override
    public String toString() {
        return "CustomerPicture{" +
                "idCard='" + idCard + '\'' +
                ", picture=" + Arrays.toString(picture) +
                ", idPicture=" + Arrays.toString(idPicture) +
                '}';
    }
}
