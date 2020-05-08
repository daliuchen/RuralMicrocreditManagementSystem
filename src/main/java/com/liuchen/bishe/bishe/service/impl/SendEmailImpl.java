package com.liuchen.bishe.bishe.service.impl;

import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.service.SendEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Date;

/**
 * 发送邮件impl
 * @author: liuchen
 **/
@Service
public class SendEmailImpl  implements SendEmail {

    @Autowired
    private JavaMailSender javaMailSender;


    @Override
    public void sendEmail(Contract contract) throws MessagingException {

        //得到邮件地址
        String email = contract.getCustomer().getEmail();
        //合同的开始时间
        Date begin = contract.getBegin();
        //合同的结束时间
        Date end = contract.getEnd();

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
        //发送方
        helper.setFrom("1178503733@qq.com");
        //接受房2
        helper.setTo(email);
        //主题
        helper.setSubject("贷款到期提醒");
        //消息正文
        String messageMainText = new StringBuffer().append("尊敬的").append(contract.getCustomer().getName()).append("男士/女士:").append("\n")
                .append("您的贷款：开始时间:").append(begin).append(" 结束时间:").append(contract.getEnd())
                .append("已经到期").append("请您按时还款。").toString();
        helper.setText(messageMainText);

        //发送消息
        javaMailSender.send(message);
    }




    @Override
    public void sendEmail(String email, String rCode) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
        helper.setFrom("liuxiaocheng386@163.com");
        helper.setTo(email);
        helper.setSubject("验证码");
        helper.setText("您的验证码是"+rCode+"转发给他人可能导致账号以及财产不安全，请勿泄漏，谨防被骗");
        javaMailSender.send(message);
    }




}
