package com.liuchen.bishe.bishe.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.dao.CustomerMapper;
import com.liuchen.bishe.bishe.dao.LoanMapper;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.entry.LoanApplication;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.myEnum.LoanStatusEnum;
import com.liuchen.bishe.bishe.myEnum.RoleEnum;
import com.liuchen.bishe.bishe.service.LoanService;
import com.liuchen.bishe.bishe.util.NoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @program: bishe
 * @description: LoanService
 * @author: liuchen
 * @create: 2020-02-16 21:11
 **/
@Service
public class LoanServiceImpl implements LoanService {
    @Autowired
    private LoanMapper loanMapper;

    @Autowired
    private CustomerMapper customerMapper;


    public void addLoan(double money, String year, String loanPeople, String idCard,int customerId){
        LoanApplication loanApplication = new LoanApplication();
        loanApplication.setMoney(money);
        loanApplication.setCreateDate(new Date());
        loanApplication.setNo(NoUtil.getNo("SQ"));
        loanApplication.setTime(year);
        Customer customer = new Customer();
        customer.setId(customerId);
        loanApplication.setCustomer(customer);
        Customer bondMan =  new Customer();
        bondMan.setIdCard(idCard);
        loanApplication.setBondsman(bondMan);//担保人身份证号
        loanApplication.setStatus(LoanStatusEnum.LOAN_STATUS_ENUM_WEI_CHU_LI.getName());
        loanApplication.setIsDelete(1);

        loanMapper.addLoan(loanApplication);
    }




    @Override
    public PageInfo  findMyLoanApplication(int offset, int limit, int customerId) throws FindException {
        PageHelper.startPage(offset,limit);
        List<LoanApplication> loanApplications = loanMapper.findLoanByCustomerId(customerId);
        if(true == loanApplications.isEmpty() || loanApplications == null){
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        PageInfo<LoanApplication> pageInfo = new PageInfo<>(loanApplications);
        return  pageInfo;
    }


    @Override
    public void backMyLoan(String no) {
         loanMapper.upDateStatusByNo(no,LoanStatusEnum.LOAN_STATUS_ENUM_CHE_XIAO.getName());
    }




    @Override
    public PageInfo findLoanApplicationByStatus(int offset, int limit,String idCard, LoanStatusEnum statusEnum) throws FindException{

        //区分是全部查找还是搜索框搜索  在与 idCard 是不是"" 如果是"" 让customerId 为 -1 如果不是，通过idCard来查找customer
        int customerId = -1;
        if(false == "".equals(idCard.trim())){
            List<Customer> customers = customerMapper.findCustomerByIdCard(idCard, RoleEnum.ROLE_ENUM_CUSTOMER.getName());
            if(true == customers.isEmpty()){
                throw  new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
            }
            if(true == customers.size() > 1){
                throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_FINDMANY);
            }
            customerId = customers.get(0).getId();
        }

            PageHelper.startPage(offset,limit);
            List<LoanApplication> loanApplications = loanMapper.findLoanApplicationByIdCardAndStatus(customerId,statusEnum.getName());

            if(true == loanApplications.isEmpty()){
                throw  new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
            }

        PageInfo<LoanApplication> pageInfo = new PageInfo<>(loanApplications);
        return  pageInfo;
    }




    @Override
    public List<LoanApplication> findLoanByNoAndStatus(String no, LoanStatusEnum loanStatusEnum) throws FindException {
        List<LoanApplication> loanApplications = loanMapper.findLoanByNoAndStatus(no, loanStatusEnum.getName());
        if(true == loanApplications.isEmpty()){
            throw  new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        return  loanApplications;
    }




    @Override
    public void agreeloanApplication(String no) {
            loanMapper.upDateStatusByNo(no,LoanStatusEnum.LOAN_STATUS_ENUM_TONG_GUO.getName());
    }




    @Override
    public void notAgreeloanApplication(String no) {
        loanMapper.upDateStatusByNo(no,LoanStatusEnum.LOAN_STATUS_ENUM_NOT_PASS.getName());
    }




}
