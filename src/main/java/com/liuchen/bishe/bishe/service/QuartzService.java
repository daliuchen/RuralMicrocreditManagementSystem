package com.liuchen.bishe.bishe.service;

import java.util.Date;
import java.util.Map;

/**
 * @program: bishe
 * @description: 任务调度service
 * @author: liuchen
 * @create: 2020-02-14 10:52
 **/
public interface QuartzService {

    /**
     *
     * @param clazz     job类
     * @param jobName   job名字
     * @param groupName 组名
     * @param startDate 开始时间
     * @param param     参数
     */
    void addJobSimpl(Class clazz, String jobName, String groupName, Date startDate,Map<String,Object> param);

    /**
     * 添加任务可以传参数
     *
     * @param clazz
     * @param jobName
     * @param groupName
     * @param cronExp
     * @param param
     */
    void addJobCron(Class clazz, String jobName, String groupName, String cronExp, Map<String, Object> param);

    /**
     * 暂停任务
     *
     * @param name
     * @param groupName
     */
    void pauseJob(String name, String groupName);

    /**
     * 恢复任务
     *
     * @param name
     * @param groupName
     */
    void resumeJob(String name, String groupName);

    /**
     * 更新任务
     *
     * @param name
     * @param groupName
     * @param cronExp
     * @param param
     */
    void updateJob(String name, String groupName, String cronExp, Map<String, Object> param);

    /**
     * 删除任务
     *
     * @param name
     * @param groupName
     */
    void deleteJob(String name, String groupName);

    /**
     * 启动所有任务
     */
    void startAllJobs();

    /**
     * 关闭所有任务
     */
    void shutdownAllJobs();

}
