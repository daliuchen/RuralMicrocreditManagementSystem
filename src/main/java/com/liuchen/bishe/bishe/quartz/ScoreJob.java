package com.liuchen.bishe.bishe.quartz;

import com.liuchen.bishe.bishe.dao.ConstractMapper;
import com.liuchen.bishe.bishe.dao.ScoreMapper;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.entry.Score;
import com.liuchen.bishe.bishe.myEnum.ConstractEnum;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.ReentrantLock;



/**
 *                                          已经完成
 *
 * @program: bishe
 * @description: 计算信用分job
 * @author: liuchen
 * @create: 2020-02-14 12:16
 **/
@Component
public class ScoreJob extends QuartzJobBean {


    @Autowired
    private ConstractMapper constractMapper;


    @Autowired
    private ScoreMapper scoreMapper;


    private ReentrantLock lock = new ReentrantLock();

    /*


        在点击还款的时候，应该判断这个合同的状态，对应表中的contractStatus字段
          每周末的星期五晚上十二点之后，开始执行    0 0 0 ? * FRI
           执行内容：
            1：查找状态为 提早还款状态的 合同，，查找字段金额，贷款时间。➕分
            2；查找状态为 逾期的合同 查找规定还款字段，金额，贷款时间，用现在的时间减去规定还款时间，➖ 分
            3：查找状态为 按时还款的合同，查找字段为 金额，贷款时间， + 分
     */
    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        CountDownLatch countDownLatch = new CountDownLatch(3);

        ExecutorService executorService = Executors.newFixedThreadPool(3);
        executorService.execute(()->{
            // 查找状态为 提早还款状态的 合同，，查找字段金额，贷款时间。➕分
            lock.lock();
            try {
                List<Contract> contracts = constractMapper.listContractByContractStatus(ConstractEnum.CONSTRACT_ENUM_TI_QIAN_MONEY.getName());
                for (Contract contract : contracts) {
                    Date end = contract.getEnd();
                    Date moneyBack = contract.getMoneyBack();
                    LocalDateTime endLocal = LocalDateTime.ofInstant(end.toInstant(), ZoneId.systemDefault());
                    LocalDateTime backLocal = LocalDateTime.ofInstant(moneyBack.toInstant(), ZoneId.systemDefault());
                    //判断还款时间是不是在合同规定还款时间之前
                    if(endLocal.compareTo(backLocal) > 0){
                        //计算两个差多少天
                        long day = Duration.between(backLocal, endLocal).toDays();
                        //计算分数
                        int score = (int)(day % 7 + 1);
                        //查询原来的分数
                        Score scoreEntry = scoreMapper.findCustomerScoreByCustomerId(contract.getCustomer().getId());
                        scoreEntry.setScore(scoreEntry.getScore()+score);
                        //更新
                        scoreMapper.updateCustomerByCustomerId(scoreEntry.getScore(),contract.getCustomer().getId());
                    }


                }

            }finally {
                lock.unlock();
                countDownLatch.countDown();
            }
        });

        executorService.execute(()->{
            //  2；查找状态为 逾期的合同 查找规定还款字段，金额，贷款时间，用现在的时间减去规定还款时间，➖ 分
            lock.lock();
            try {

                List<Contract> contracts = constractMapper.listContractByContractStatus(ConstractEnum.CONSTRACT_ENUM_YU_QI_MONEY.getName());
                for (Contract contract : contracts) {
                    Date end = contract.getEnd();
                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime endLocal = LocalDateTime.ofInstant(end.toInstant(), ZoneId.systemDefault());

                    //判断是不是逾期
                    if(now.compareTo(endLocal) > 0){
                        //计算两个差多少天
                        long day = Duration.between(endLocal, now).toDays();
                        //计算分数
                        int score = (int)(day % 7 + 2);
                        //查询原来的分数
                        Score scoreEntry = scoreMapper.findCustomerScoreByCustomerId(contract.getCustomer().getId());
                        scoreEntry.setScore(scoreEntry.getScore()-score);
                        //更新
                        scoreMapper.updateCustomerByCustomerId(scoreEntry.getScore(),contract.getCustomer().getId());
                    }
                }

            }finally {
                lock.unlock();
                countDownLatch.countDown();
            }
        });

        executorService.execute(()->{
            //   3：查找状态为 按时还款的合同，查找字段为 金额，贷款时间， + 分
            lock.lock();
            try {

                List<Contract> contracts = constractMapper.listContractByContractStatus(ConstractEnum.CONSTRACT_ENUM_AN_SHI_MONEY.getName());
                for (Contract contract : contracts) {
                    Date end = contract.getEnd();
                    LocalDateTime endLocal = LocalDateTime.ofInstant(end.toInstant(), ZoneId.systemDefault());
                        //计算分数
                        int score = 1;
                        //查询原来的分数
                        Score scoreEntry = scoreMapper.findCustomerScoreByCustomerId(contract.getCustomer().getId());
                        scoreEntry.setScore(scoreEntry.getScore()+score);
                        //更新
                        scoreMapper.updateCustomerByCustomerId(scoreEntry.getScore(),contract.getCustomer().getId());
                    }

            }finally {
                lock.unlock();
                countDownLatch.countDown();
            }
        });


        try {
            //主线程等待
            countDownLatch.await();
            //关闭线程池
            executorService.shutdownNow();

        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }


}
