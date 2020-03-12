package com.liuchen.bishe.bishe.quartz;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * @program: bishe
 * @description: 计算信用分job
 * @author: liuchen
 * @create: 2020-02-14 12:16
 **/
public class ScoreJob extends QuartzJobBean {




    /*
        每周末的星期天晚上十二点之后，开始执行
        执行内容：
            1：查找状态为 提早还款状态的 合同，，查找字段金额，贷款时间。➕分
            2；查找状态为 逾期的合同 查找规定还款字段，金额，贷款时间，用现在的时间减去规定还款时间，➖ 分
            3：查找状态为 按时还款的合同，查找字段为 金额，贷款时间， + 分
     */
    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

    }


}
