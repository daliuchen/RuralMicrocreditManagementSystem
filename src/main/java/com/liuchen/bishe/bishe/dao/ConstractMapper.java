package com.liuchen.bishe.bishe.dao;

import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.vo.CustomerContractMonthVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ConstractMapper {

    /**
     * 通过customerId和staus查找
     * @param customerId
     * @param status
     * @return
     */
     List<Contract> listConstractByCustomerIdAndStatus(@Param("customerId") int customerId, @Param("status") String status);


    /**
     * 用户贷款详情折线图，按照年份来查找用户的贷款情况.通过group by 对月分组
     * @param year
     * @return
     */
     List<CustomerContractMonthVo> findCustomerConstractWithMonth(@Param("customerId") int customerId,@Param("year") String year,@Param("contractStatus") String contractStatus);


    /**
     * 用户贷款折线图下拉框选择时间。查找用户贷款的年份
     * @param customerId
     * @return
     */
     List<Integer> selectConstractMinMaxYear(int customerId);


    /**
     * 更新contract通过no更新status
     * @param no
     * @param status
     */
    void updateContract(@Param("no") String no ,@Param("status") String status,@Param("customerId") int customerId);


    /**
     * 查找contract 通过no
     * @param no
     * @return
     */
    Contract getContractByno(String no,String status);
}
