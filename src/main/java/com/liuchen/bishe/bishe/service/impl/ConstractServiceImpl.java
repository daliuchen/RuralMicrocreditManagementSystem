package com.liuchen.bishe.bishe.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.dao.ConstractMapper;
import com.liuchen.bishe.bishe.dao.CustomerMapper;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.entry.LoanApplication;
import com.liuchen.bishe.bishe.exception.DeleteException;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ConstractEnum;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.service.ConstractService;
import com.liuchen.bishe.bishe.util.ContractUtil;
import com.liuchen.bishe.bishe.util.NoUtil;
import com.liuchen.bishe.bishe.vo.CustomerContractMonthVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

/**
 * @program: bishe
 * @description: ConstractService实现类
 * @author: liuchen
 * @create: 2020-02-16 11:29
 **/
@Service
public class ConstractServiceImpl implements ConstractService {

    @Autowired
    private  ConstractMapper constractMapper;

    @Autowired
    private CustomerMapper customerMapper;



    @Override
    public PageInfo findAllCusotmerByPage(int offset, int pageNumber, String idCard, ConstractEnum constractEnum) throws FindException {
        int customerId = -1;

        // 输入框查找
        if(idCard != null){
            List<Customer> customers = customerMapper.findCustomerByIdCard(idCard, null);
            if(true == customers.isEmpty()){
                throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
            }
            if(customers.size() > 1){
                throw  new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_FINDMANY);
            }
            customerId = customers.get(0).getId();

        }

        //页面初始化
        PageHelper.startPage(offset,pageNumber);
        List<Contract> contracts = constractMapper.listConstractByCustomerIdAndStatus(customerId, constractEnum.getName());
        if(contracts.isEmpty()){
            throw  new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }

        //如果是逾期的话才会计算逾期时间
        if("逾期".equals(constractEnum.getName())){
            contracts= ContractUtil.overdure(contracts);
        }

        return  new PageInfo<>(contracts);

    }




    @Override
    public Map<String, List<Integer>> findCustomerContractStatusWithMonth(int customerId,String year) {
        //这里利用桶排序来补全
        int[] a = new int[12];
        int[] b = new int[12];
        int[] c = new int[12];

        //如果查询出来之后，月份不全 要补全
        Map<String,List<Integer>> maps = new HashMap<>();
        List<Integer> empty = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        List<CustomerContractMonthVo> constract1 = constractMapper.findCustomerConstractWithMonth(customerId,year, ConstractEnum.CONSTRACT_ENUM_AN_SHI_MONEY.getName());
        List<CustomerContractMonthVo> constract2 = constractMapper.findCustomerConstractWithMonth(customerId,year, ConstractEnum.CONSTRACT_ENUM_TI_QIAN_MONEY.getName());
        List<CustomerContractMonthVo> constract3 = constractMapper.findCustomerConstractWithMonth(customerId,year, ConstractEnum.CONSTRACT_ENUM_YU_QI_MONEY.getName());
        List<Integer> anShi = new ArrayList<>();
        List<Integer> tiQian = new ArrayList<>();
        List<Integer> yuQi = new ArrayList<>();



        //如果按时还款没有数据
        if(true == constract1.isEmpty() || constract1 == null){
            //全为0
            anShi = empty;
        }else {
            //有数据
            for (CustomerContractMonthVo vo : constract1) {
                a[vo.getMonth()-1] = vo.getCount();
            }
            for (int i = 0; i < a.length; i++) {
                anShi.add(a[i]);
            }


        }


        if(true == constract2.isEmpty() || constract2 == null){
            tiQian = empty;
        }else{
            //有数据
            for (CustomerContractMonthVo vo : constract1) {
                b[vo.getMonth()-1] = vo.getCount();
            }
            for (int i = 0; i < a.length; i++) {
                tiQian.add(b[i]);
            }
        }



        if(true == constract3.isEmpty() || constract3 == null){
            yuQi = empty;
        }else{
            //有数据
            for (CustomerContractMonthVo vo : constract1) {
                c[vo.getMonth()-1] = vo.getCount();
            }
            for (int i = 0; i < a.length; i++) {
                yuQi.add(c[i]);
            }
        }
        maps.put("anShi",anShi);
        maps.put("tiQian",tiQian);
        maps.put("yuQi",yuQi);
        return maps;
    }




    @Override
    public void repayment(String no, ConstractEnum constractEnum,int assessingOfficerId) {
        constractMapper.updateContract(no,constractEnum.getName(),assessingOfficerId);
    }




    @Override
    public Contract getContractByNoAndStatus(String no, ConstractEnum constractEnum) throws FindException {
        Contract contract = constractMapper.getContractByno(no, constractEnum.getName());
        if(contract == null){
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        return contract;
    }

    @Override
    public void deleteContractByNo(String no) throws DeleteException {
        int i = constractMapper.deleteContractByNo(no);
        if(i <= 0){
            throw new DeleteException("删除失败");
        }
    }

    @Override
    public void addContract(LoanApplication loanApplication,int assessingOfficerId) {
        //添加合同
        Contract contract = new Contract();
        //设置合同好
        contract.setNo(NoUtil.getNo("HT"));
        //贷款人id
        contract.setCustomer(loanApplication.getCustomer());
        //开始时间不能弄。要等到 贷款人同意之后才能有
        contract.setMoney(new BigDecimal(loanApplication.getMoney()));
        //status为甲方签署
        contract.setStatus(ConstractEnum.CONSTRACT_ENUM_JIAFANG.getName());
        //设置 申请id  表示这个合同是对应那个申请的
        contract.setLoan(loanApplication);
        // 操作员id
         Customer assessingOddicer = new Customer();
         assessingOddicer.setId(assessingOfficerId);
        contract.setAssessingOfficer(assessingOddicer);
        contract.setId(1);

        constractMapper.addContract(contract);
    }
}
