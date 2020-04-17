package com.liuchen.bishe.bishe.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.dao.ConstractMapper;
import com.liuchen.bishe.bishe.dao.CustomerMapper;
import com.liuchen.bishe.bishe.dao.LoanMapper;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.entry.LoanApplication;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.myEnum.LoanStatusEnum;
import com.liuchen.bishe.bishe.myEnum.RoleEnum;
import com.liuchen.bishe.bishe.service.ConstractService;
import com.liuchen.bishe.bishe.service.LoanService;
import com.liuchen.bishe.bishe.util.NoUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @program: bishe
 * @description: LoanService
 * @author: liuchen
 * @create: 2020-02-16 21:11
 **/
@Service
@Slf4j
public class LoanServiceImpl implements LoanService {
    @Autowired
    private LoanMapper loanMapper;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private ConstractService constractService;


    @Override
    public void addLoan(double money, String year, String loanPeople, String idCard, int customerId) {
        LoanApplication loanApplication = new LoanApplication();
        loanApplication.setMoney(money);
        loanApplication.setCreateDate(new Date());
        loanApplication.setNo(NoUtil.getNo("SQ"));
        loanApplication.setTime(year);
        //设置贷款人id
        Customer customer = new Customer();
        customer.setId(customerId);
        loanApplication.setCustomer(customer);

        //设置担保人id
        List<Customer> customerss = customerMapper.findCustomerByIdCard(idCard, null);
        Customer bondMan = customerss.get(0);
        loanApplication.setBondsman(bondMan);


        loanApplication.setStatus(LoanStatusEnum.LOAN_STATUS_ENUM_WEI_CHU_LI.getName());
        loanApplication.setIsDelete(1);

        loanMapper.addLoan(loanApplication);
    }


    @Override
    public PageInfo findMyLoanApplication(int offset, int limit, int customerId) throws FindException {
        PageHelper.startPage(offset, limit);
        List<LoanApplication> loanApplications = loanMapper.findLoanByCustomerId(customerId);
        if (true == loanApplications.isEmpty() || loanApplications == null) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        PageInfo<LoanApplication> pageInfo = new PageInfo<>(loanApplications);
        return pageInfo;
    }


    @Override
    public void backMyLoan(String no) {
        loanMapper.upDateStatusByNo(no, LoanStatusEnum.LOAN_STATUS_ENUM_CHE_XIAO.getName());
    }


    @Override
    public PageInfo findLoanApplicationByStatus(int offset, int limit, String idCard, LoanStatusEnum statusEnum) throws FindException {

        //区分是全部查找还是搜索框搜索  在与 idCard 是不是"-1" 如果是"-1" 让customerId 为 -1 如果不是，通过idCard来查找customer
        int customerId = -1;
        if (false == "-1".equals(idCard.trim())) {
            //list
            List<Customer> customers = customerMapper.findCustomerByIdCard(idCard, RoleEnum.ROLE_ENUM_CUSTOMER.getName());
            if (true == customers.isEmpty()) {
                throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
            }
            if (true == customers.size() > 1) {
                throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_FINDMANY);
            }
            customerId = customers.get(0).getId();
        }

        PageHelper.startPage(offset, limit);
        List<LoanApplication> loanApplications = loanMapper.findLoanApplicationByIdCardAndStatus(customerId, statusEnum.getName());

        if (true == loanApplications.isEmpty()) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }

        log.info("未处理的 申请有 {}", loanApplications);
        PageInfo<LoanApplication> pageInfo = new PageInfo<>(loanApplications);
        return pageInfo;
    }


    @Override
    public List<LoanApplication> findLoanByNoAndStatus(String no, LoanStatusEnum loanStatusEnum) throws FindException {
        List<LoanApplication> loanApplications = loanMapper.findLoanByNoAndStatus(no, loanStatusEnum.getName());
        if (true == loanApplications.isEmpty()) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        return loanApplications;
    }


    //TODO:之后测试留意
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void agreeloanApplication(String no, int assessOfferId) throws FindException {
        loanMapper.upDateStatusByNo(no, LoanStatusEnum.LOAN_STATUS_ENUM_TONG_GUO.getName());
        //通过贷款编号查找
        List<LoanApplication> loanByNoAndStatus = loanMapper.findLoanByNoAndStatus(no, null);
        if (loanByNoAndStatus.size() > 1) {
            throw new FindException("找太多", null);
        }
        LoanApplication loanApplication = loanByNoAndStatus.get(0);
        //创建合同
        //创建合同的时候合同的状态为甲方签署，等用户账户登录之后，通过的申请显示，提醒用户去签署合同,之后要发送邮件提醒。
        constractService.addContract(loanApplication, assessOfferId);


    }


    @Override
    public void notAgreeloanApplication(String no) {
        loanMapper.upDateStatusByNo(no, LoanStatusEnum.LOAN_STATUS_ENUM_NOT_PASS.getName());
    }


}
