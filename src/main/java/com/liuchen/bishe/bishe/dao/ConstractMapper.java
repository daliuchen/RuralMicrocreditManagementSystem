package com.liuchen.bishe.bishe.dao;

import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.vo.CustomerContractMonthVo;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
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
     * 通过customerId和staus查找
     * @param customerId
     * @return
     */
    List<Contract> listContractByCustomerId(@Param("customerId") int customerId);








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
     * @param no     合同编号
     * @param status    staus
     * @param customerId    操作员ID
     */
    void updateContract(@Param("no") String no ,@Param("status") String status,@Param("customerId") int customerId);


    /**
     * 查找contract 通过no
     * @param no
     * @return
     */
    Contract getContractByno(String no,String status);


    /**
     * 通过贷款申请id查找合同NO
     * @param loanId    贷款申请id
     * @return
     */
    String getNoByLoanId(int loanId);


    /**
     * 通过no删除-----》 实质就是更新isdelete字段为0
     * @param no   合同no
     * @return
     */
    int deleteContractByNo(String no);


    /**
     * 添加合同
     * @param contract
     */
    void addContract(@Param("contract") Contract contract);


    /**
     * 乙方签署合同之后，更新合同的开始时间和结束时间，还有状态
     * @param no        合同编号
     * @param begin     开始时间
     * @param end       结束时间
     * @param staus     状态
     */
    void updateContractWithZifang(String no,Date begin,Date end,String staus);


    /**
     * 通过贷款申请号来更新 contract
     * @param loanId    贷款申请id
     * @param status    status对应字段，合同状态
     */
    void updateByLoanApplicationNo(int loanId,String status);



    /**
     * ------------------------------------------------------------------------------》 从这里往下面就是quaretz框架了
     *
     * ------------------------------------------------------------------------------》 从这里往下面就是quaretz框架了
     */

    /**
     *   检查所有的合同 每天晚上十二点之后
     *               -  条件：  规定还款时间=今天，合同的状态为未到期
     *                 操作  合同的状态变为今天到期
     */
    void updateContractQueratz();


    /**
     *条件：  查询 end 字段 < 今天 并且 还款时间为null 并且 合同的状态不是逾期 不是 甲方签署 乙方签署 乙方不签署
     *                 操作： 合同的状态变为逾期
     */
    void updateContractQueratzYuQi();


    /**
     * quartz 计算信用分 通过contractStatus查找
     * @param contractStatus
     * @return
     */
    List<Contract> listContractByContractStatus(String contractStatus);




    /**
     * ----------------------------------------------------------------------------------->
     *
     *                      下面是和dashborad相关的
     * ----------------------------------------------------------------------------------->
     */


    /**
     * 查找每一个状态的合同的个数
     * @param status
     * @return
     */
    int countContractByStatus(String status);





}
