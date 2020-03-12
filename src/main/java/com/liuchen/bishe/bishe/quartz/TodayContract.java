package com.liuchen.bishe.bishe.quartz;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * @program: bishe
 * @description: 今天到期邮件
 * @author: liuchen
 * @create: 2020-02-14 12:32
 **/
public class TodayContract  extends QuartzJobBean {

    /*
        检查所有的合同 每天晚上十二点之后
            -  条件：  规定还款时间=今天，合同的状态为未到期
                操作  合同的状态变为今天到期
            -  条件：  用户最终还款时间为null，并且规定的还款日 < 今天
                操作： 合同的状态变为逾期

      */
    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

    }


}
