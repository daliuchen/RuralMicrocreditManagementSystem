package com.liuchen.bishe.bishe.quartz;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * @program: bishe
 * @description: 发送邮件job
 * @author: liuchen
 * @create: 2020-02-14 12:29
 **/
public class EmailJob extends QuartzJobBean {

    /*
      1：发送邮件 在早上的十点
            条件  查找表中合同状态为 今天到期
            操作   通过 customerID 在客户表中查找客户的信息，发送消息。
     */
    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

    }


}
