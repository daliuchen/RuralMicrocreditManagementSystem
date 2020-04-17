package com.liuchen.bishe.bishe.service;

import com.liuchen.bishe.bishe.entry.Contract;

import javax.mail.MessagingException;

/**
 * 发送邮件
 * @author liuchen
 */
public interface SendEmail {

    /**
     * 发送email
     * @param contract
     */
     void sendEmail(Contract contract) throws MessagingException;


    /**
     * 忘记密码 获取验证码，发给邮箱
     * @param email
     * @param rCode
     */
    void sendEmail(String email,String rCode) throws MessagingException;

}
