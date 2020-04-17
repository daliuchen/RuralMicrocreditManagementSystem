package com.liuchen.bishe.bishe.awre;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liuchen.bishe.bishe.quartz.ContractExamine;
import com.liuchen.bishe.bishe.quartz.ScoreJob;
import com.liuchen.bishe.bishe.service.QuartzService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * @program: bishe
 * @description:
 * @author: liuchen
 **/
@Component
@Slf4j
public class QuartzAwre  implements ApplicationContextAware {

    private ApplicationContext applicationContext;
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
        //得到QuartzService
        QuartzService bean = applicationContext.getBean(QuartzService.class);
        log.info("-----> 得到QuartzService");
        //添加ContractExamine进Quartz
        bean.addJobCron(ContractExamine.class,"contractExam","contractExam","0 0 0 1/1 * ?",null);
        log.info("-----> 添加 检查 **合同任务** 任务");
        //添加ScoreJob进Quartz
        bean.addJobCron(ScoreJob.class,"scoreExam","scoreExam","0 0 0 ? * FRI",null);
        log.info("-----> 添加 检查 **定期更新分数** 任务");

        //添加任务 ok
    }


}
