package com.liuchen.bishe.bishe.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.dao.ConstractMapper;
import com.liuchen.bishe.bishe.dao.CustomerMapper;
import com.liuchen.bishe.bishe.dao.LoanMapper;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.entry.LoanApplication;
import com.liuchen.bishe.bishe.exception.DeleteException;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ConstractEnum;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.myEnum.LoanStatusEnum;
import com.liuchen.bishe.bishe.service.ConstractService;
import com.liuchen.bishe.bishe.util.ContractUtil;
import com.liuchen.bishe.bishe.util.NoUtil;
import com.liuchen.bishe.bishe.vo.CustomerContractMonthVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * @program: bishe
 * @description: ConstractService实现类
 * @author: liuchen
 * @create: 2020-02-16 11:29
 **/
@Service
public class ConstractServiceImpl implements ConstractService {

    @Autowired
    private ConstractMapper constractMapper;

    @Autowired
    private CustomerMapper customerMapper;


    @Autowired
    private LoanMapper loanMapper;


    @Override
    public PageInfo findAllCusotmerByPage(int offset, int pageNumber, String idCard, ConstractEnum constractEnum) throws FindException {
        int customerId = -1;

        // 输入框查找
        if (idCard != null) {
            List<Customer> customers = customerMapper.findCustomerByIdCard(idCard.trim(), null);
            if (true == customers.isEmpty()) {
                throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
            }
            if (customers.size() > 1) {
                throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_FINDMANY);
            }
            customerId = customers.get(0).getId();

        }

        //页面初始化
        PageHelper.startPage(offset, pageNumber);
        List<Contract> contracts = constractMapper.listConstractByCustomerIdAndStatus(customerId, constractEnum.getName());
        if (contracts.isEmpty()) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }

        //如果是逾期的话才会计算逾期时间
        if ("逾期".equals(constractEnum.getName())) {
            contracts = ContractUtil.overdure(contracts);
        }

        return new PageInfo<>(contracts);

    }


    @Override
    public Map<String, List<Integer>> findCustomerContractStatusWithMonth(int customerId, String year) {
        //这里利用桶排序来补全
        int[] a = new int[12];
        int[] b = new int[12];
        int[] c = new int[12];

        //如果查询出来之后，月份不全 要补全
        Map<String, List<Integer>> maps = new HashMap<>();
        List<Integer> empty = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        List<CustomerContractMonthVo> constract1 = constractMapper.findCustomerConstractWithMonth(customerId, year, ConstractEnum.CONSTRACT_ENUM_AN_SHI_MONEY.getName());
        List<CustomerContractMonthVo> constract2 = constractMapper.findCustomerConstractWithMonth(customerId, year, ConstractEnum.CONSTRACT_ENUM_TI_QIAN_MONEY.getName());
        List<CustomerContractMonthVo> constract3 = constractMapper.findCustomerConstractWithMonth(customerId, year, ConstractEnum.CONSTRACT_ENUM_YU_QI_MONEY.getName());
        List<Integer> anShi = new ArrayList<>();
        List<Integer> tiQian = new ArrayList<>();
        List<Integer> yuQi = new ArrayList<>();


        //如果按时还款没有数据
        if (true == constract1.isEmpty() || constract1 == null) {
            //全为0
            anShi = empty;
        } else {
            //有数据
            for (CustomerContractMonthVo vo : constract1) {
                a[vo.getMonth() - 1] = vo.getCount();
            }
            for (int i = 0; i < a.length; i++) {
                anShi.add(a[i]);
            }


        }


        if (true == constract2.isEmpty() || constract2 == null) {
            tiQian = empty;
        } else {
            //有数据
            for (CustomerContractMonthVo vo : constract2) {
                b[vo.getMonth() - 1] = vo.getCount();
            }
            for (int i = 0; i < a.length; i++) {
                tiQian.add(b[i]);
            }
        }


        if (true == constract3.isEmpty() || constract3 == null) {
            yuQi = empty;
        } else {
            //有数据
            for (CustomerContractMonthVo vo : constract3) {
                c[vo.getMonth() - 1] = vo.getCount();
            }
            for (int i = 0; i < a.length; i++) {
                yuQi.add(c[i]);
            }
        }
        maps.put("anShi", anShi);
        maps.put("tiQian", tiQian);
        maps.put("yuQi", yuQi);
        return maps;
    }


    @Override
    public void repayment(String no, ConstractEnum constractEnum, int assessingOfficerId) {
        constractMapper.updateContract(no, constractEnum.getName(), assessingOfficerId);
    }


    @Override
    public Contract getContractByNoAndStatus(String no, ConstractEnum constractEnum) throws FindException {
        Contract contract = constractMapper.getContractByno(no, constractEnum.getName());
        if (contract == null) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        return contract;
    }

    @Override
    public void deleteContractByNo(String no) throws DeleteException {
        int i = constractMapper.deleteContractByNo(no);
        if (i <= 0) {
            throw new DeleteException("删除失败");
        }
    }

    @Override
    public void addContract(LoanApplication loanApplication, int assessingOfficerId) {
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
        contract.setIsDelete(1);


        constractMapper.addContract(contract);
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public void updateContractByLoanNo(String loanNo, ConstractEnum constractEnum) {
        //对应的贷款申请变为 撤销
        loanMapper.upDateStatusByNo(loanNo,LoanStatusEnum.LOAN_STATUS_ENUM_CHE_XIAO.getName(),-1);

        //调用loanMapper查
        int loanId = loanMapper.getLoanByNo(loanNo.trim());
        //contractMapper更新
        constractMapper.updateByLoanApplicationNo(loanId, constractEnum.getName());
    }



    @Transactional(rollbackFor = Exception.class)
    @Override
        public void goContact(String loanNo) {

        //将申请状态变为已有对应合同
        loanMapper.upDateStatusByNo(loanNo, LoanStatusEnum.LOAN_STATUS_ENUM_YI_YOU_HE_TONG.getName(),-1);





        List<LoanApplication> loans = loanMapper.findLoanByNoAndStatus(loanNo, null);

        LoanApplication loan = loans.get(0);

        //得到合同编号通过贷款id
        String contractNo  = constractMapper.getNoByLoanId(loan.getId());


        LocalDateTime start = LocalDateTime.now();
        String time = loan.getTime();
        String[] split = time.split("-");
        String year = split[0];
        String month = split[1];
        LocalDateTime end = start.plusYears(Long.parseLong(year)).plusMonths(Long.parseLong(month));

        //将localDateTime变为Date
        //得到系统默认的时区
        ZoneId zoneId = ZoneId.systemDefault();

        ZonedDateTime a1 = start.atZone(zoneId);
        ZonedDateTime a2 = end.atZone(zoneId);

        Date begin = Date.from(a1.toInstant());
        Date over = Date.from(a2.toInstant());

        //生成合同，根据合同no来更新合同
        constractMapper.updateContractWithZifang(contractNo,begin,over,ConstractEnum.CONSTRACT_ENUM_WEIDAOQI.getName());
    }



    @Override
    public PageInfo<Contract> findMyContract(int offset, int limit, int cusotmerId) throws FindException {
        Page<Object> page = PageHelper.startPage(offset, limit);


        //做查询
        List<Contract> contracts = constractMapper.listContractByCustomerId(cusotmerId);


        if (true == contracts.isEmpty()) {
            throw new FindException("客户id为"+cusotmerId+"  合同 没有 ", ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }



        PageInfo<Contract> pageInfo = new PageInfo<>(contracts);
        return pageInfo;
    }






}
