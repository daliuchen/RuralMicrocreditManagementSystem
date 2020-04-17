package com.liuchen.bishe.bishe.quartz;

import com.liuchen.bishe.bishe.dao.ConstractMapper;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ConstractEnum;
import com.liuchen.bishe.bishe.service.ConstractService;
import com.liuchen.bishe.bishe.service.SendEmail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @program: bishe
 * @description: 合同检查任务
 * @author: liuchen
 **/
@Component
public class ContractExamine extends QuartzJobBean {

    /**
     *          这边的代码已经写完
     *
     *
     *
     *
     *          检查所有的合同 每天十二点之后    cron表达式为0 0 0 1/1 * ?
     *             -  条件：  规定还款时间=今天，合同的状态为未到期
     *                 操作  合同的状态变为今天到期      同时发送邮件提醒
     *             -  条件：  查询 end 字段 < 今天 并且 还款时间为null 并且 合同的状态不是逾期 不是 甲方签署 乙方签署 乙方不签署
     *                 操作： 合同的状态变为逾期
     *
     */

    @Autowired
    private ConstractMapper constractMappe;

    @Autowired
    private SendEmail sendEmail;


    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        /**
         *  今天到期
         */
        constractMappe.updateContractQueratz();

        /**
         * 逾期
         */
        constractMappe.updateContractQueratzYuQi();


        //在上面两个操作执行完之后，开始发送邮件给用户. 数据库中查找status为今天到期的合同
        List<Contract> contracts = constractMappe.listConstractByCustomerIdAndStatus(-1, ConstractEnum.CONSTRACT_ENUM_TODAY.getName());

        //创建newCachedThreadPool
        ExecutorService executorService = Executors.newCachedThreadPool();


        for (Contract contract : contracts) {
            /**
             * 之前想法：
             *          利用多线程发送消息。但是 sendEmail 这样会有多线程访问的问题
             */
            executorService.execute(()->{
                try {
                    //考虑多线程的问题.但是这里好像并没有多线程的问题。因为创建的对象都是在方法里面的 之后测试
                    sendEmail.sendEmail(contract);
                } catch (MessagingException e) {
                    e.printStackTrace();
                }
            });

        }


    }


}
