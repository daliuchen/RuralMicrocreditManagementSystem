package com.liuchen.bishe.bishe.dao;

import com.liuchen.bishe.bishe.entry.Score;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;


public interface ScoreMapper {
    /**
     * 通过id查找 customer
     * @return
     */
    public Score findCustomerScoreByCustomerId(int  id);

    /**
     * 更新score
     * @param newScore
     * @param id
     */
    public void updateCustomerByCustomerId(@Param("newScore") int newScore,@Param("id") int id);

    /**
     * 添加 通过id
     * * @param score
     * @param id
     */
    public void addScore(@Param("score") int score,@Param("id") int id);

    /**
     * 删除通过
                customerid
     * @param id
     */
    public void deleteScore(int id);




}
