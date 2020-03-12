package com.liuchen.bishe.bishe.service.impl;

import com.liuchen.bishe.bishe.service.QuartzService;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

/**
 * @program: bishe
 * @description: 任务调度Impl
 * @author: liuchen
 * @create: 2020-02-14 10:53
 **/
@Service
public class QuartzServiceImpl implements QuartzService {

    @Autowired
    private Scheduler scheduler;





    @Override
    public void addJobSimpl(Class clazz, String jobName, String groupName, Date startDate,Map<String,Object> param){
        try {
            scheduler.start();

            JobDetail jobDetail = JobBuilder.newJob( ((Job)clazz.newInstance()).getClass() ).build();

            SimpleScheduleBuilder simpleScheduleBuilder = SimpleScheduleBuilder.repeatSecondlyForever(0);

            SimpleTrigger simpleTrigger = TriggerBuilder.newTrigger()
                                           .startAt(startDate)
                                            .withSchedule(simpleScheduleBuilder)
                                            .withIdentity(jobName,groupName)
                                            .build();
            scheduler.scheduleJob(jobDetail,simpleTrigger);
        } catch (SchedulerException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        }

    }




    @Override
    public void addJobCron(Class clazz, String jobName, String groupName, String cronExp, Map<String, Object> param) {
        try {
            scheduler.start();
            JobDetail jobDetail = JobBuilder.newJob( ( (Job)clazz.newInstance()).getClass() )
                                    .withIdentity(jobName,groupName)
                                    .build();

            /**
             *  SchedulerBuilder接口的各种实现类，可以定义不同类型的调度计划（schedule）
             *  下面的是基于表达式的调度计划 基于日历的表达式
             *
             *  Job或Trigger的key由名称（name）和分组（group）组成
             *
             *
             *  每次当 ++++     scheduler执行job时，在调用其execute(…)方法之前会创建该类的一个新的实例；   ++++++   执行完毕，对该实例的引用就被丢弃了，
             *  实例会被垃圾回收；这种执行策略带来的一个后果是，job必须有一个无参的构造函数（当使用默认的JobFactory时）；
             *  另一个后果是，在job类中，不应该定义有状态的数据属性，因为在job的多次执行中，这些属性的值不会保留。
             * 那么如何给job实例增加属性或配置呢？如何在job的多次执行中，跟踪job的状态呢？答案就是:JobDataMap，JobDetail对象的一部分。
             *
             *
             *
             * obExecutionContext中的JobDataMap为我们提供了很多的便利。它是JobDetail中的JobDataMap和Trigger中的JobDataMap的并集，
             * 但是如果存在相同的数据，则后者会覆盖前者的值
             *
             *
             *
             * @DisallowConcurrentExecution：将该注解加到job类上，告诉Quartz不要并发地执行同一个job定义（这里指特定的job类）的多个实例
             *
             *
             *
             *
             * @PersistJobDataAfterExecution：将该注解加在job类上，告诉Quartz在成功执行了job类的execute方法后（没有发生任何异常），
             * 更新JobDetail中JobDataMap的数据，使得该job（即JobDetail）在下一次执行的时候，
             * JobDataMap中是更新后的数据，而不是更新前的旧数据
             *
             *
             *
             * 如果你使用了@PersistJobDataAfterExecution注解，我们强烈建议你同时使用@DisallowConcurrentExecution注解，因为当同一个job（JobDetail）的两个实例被并发执行时，由于竞争，JobDataMap中存储的数据很可能是不确定的。
             *
             *
             *
             *
             *
             *
             *
             * SimpleTrigger可以满足的调度需求是：在具体的时间点执行一次，或者在具体的时间点执行，并且以指定的间隔重复执行若干次
             * ，SimpleTrigger的属性包括：开始时间、结束时间、重复次数以及重复的间隔。
             *
             *
             *
             * CronTrigger，您可以指定号时间表，例如“每周五中午”或“每个工作日和上午9:30”，甚至“每周一至周五上午9:00至10点之间每5分钟”和1月份的星期五“。
             * 即使如此，和SimpleTrigger一样，CronTrigger有一个startTime，它指定何时生效，以及一个（可选的）endTime，用于指定何时停止计划。
             *
             *
             */
            CronScheduleBuilder cronScheduleBuilder = CronScheduleBuilder.cronSchedule(cronExp);

            CronTrigger cronTrigger = TriggerBuilder.newTrigger()
                                        .withSchedule(cronScheduleBuilder)
                                        .withIdentity(jobName,groupName)
                                        .build();

            if(param != null){
                //放参数
                jobDetail.getJobDataMap().putAll(param);
            }

            scheduler.scheduleJob(jobDetail,cronTrigger);
            
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }




    @Override
    public void pauseJob(String name, String groupName) {
        JobKey jobKey = JobKey.jobKey(name, groupName);
        try {
            scheduler.pauseJob(jobKey);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }




    @Override
    public void resumeJob(String name, String groupName) {
        JobKey jobKey = JobKey.jobKey(name, groupName);
        try {
            scheduler.resumeJob(jobKey);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }




    @Override
    public void updateJob(String name, String groupName, String cronExp, Map<String, Object> param) {
        TriggerKey triggerKey = TriggerKey.triggerKey(name,groupName);
        CronScheduleBuilder cronScheduleBuilder = CronScheduleBuilder.cronSchedule(cronExp);
        CronTrigger cronTrigger = TriggerBuilder.newTrigger()
                                    .withSchedule(cronScheduleBuilder)
                                    .withIdentity(name,groupName)
                                    .build();
        if(param != null){
            cronTrigger.getJobDataMap().putAll(param);
        }
        try {
            scheduler.rescheduleJob(triggerKey, cronTrigger);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }




    @Override
    public void deleteJob(String name, String groupName) {
        try {
            scheduler.deleteJob(JobKey.jobKey(name,groupName));

        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }




    @Override
    public void startAllJobs() {
        try {
            scheduler.start();
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }




    @Override
    public void shutdownAllJobs() {
        try {

            if(false == scheduler.isShutdown()){
                scheduler.shutdown();
            }

        } catch (SchedulerException e) {
            e.printStackTrace();
        }

    }




}
