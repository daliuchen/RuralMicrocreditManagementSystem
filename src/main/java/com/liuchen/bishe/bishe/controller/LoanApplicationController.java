package com.liuchen.bishe.bishe.controller;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.entry.LoanApplication;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.myEnum.LoanStatusEnum;
import com.liuchen.bishe.bishe.service.LoanService;
import com.liuchen.bishe.bishe.vo.ReturnT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.List;

/**
 * @program: bishe
 * @description: 贷款申请
 * @author: liuchen
 * @create: 2020-02-16 21:05
 **/
@Controller
@Slf4j
@RequestMapping("/loan")
public class LoanApplicationController {

    @Autowired
    private LoanService loanService;


    @PostMapping("/add")
    public String addLoan(@RequestParam("money")double money,
                           @RequestParam("maxYear") String year ,
                           @RequestParam("loanPeople") String loanPeople,
                           @RequestParam("loanPeopleIdCard") String idCard,
                            HttpSession session ){

        Customer customer = (Customer) session.getAttribute("user");
        loanService.addLoan(money,year,loanPeople,idCard,customer.getId());
       return "redirect:/MyLoan";

    }


    /**
     * 查询这个人所有的贷款申请
     * @param limit
     * @param offset
     * @param session
     * @return
     * @throws FindException
     */
    @GetMapping("/myLoan")
    @ResponseBody
    public ReturnT getMyLoan(int limit,int offset,HttpSession session) throws FindException {
        Customer customer = (Customer) session.getAttribute("user");
        PageInfo pageInfo = loanService.findMyLoanApplication(offset, limit, customer.getId());
        return  new ReturnT(pageInfo);

    }




    //撤销我的贷款申请
    @GetMapping("/backMyLoan/{no}")
    @ResponseBody
    public ReturnT backLoan(@PathVariable("no") String no ){
        System.out.println(no);
        loanService.backMyLoan(no.trim());
        return  ReturnT.SUCCESS;
    }




    //审批
    @GetMapping("/shenpiList")
    @ResponseBody
    public ReturnT shenPi(int offset,int limit,String idCard ) throws FindException {
        log.info("------> 审批  url:loan/shenpiList     ");
        PageInfo pageInfo = loanService.findLoanApplicationByStatus(offset, limit, idCard, LoanStatusEnum.LOAN_STATUS_ENUM_WEI_CHU_LI);

        return new ReturnT(pageInfo);
    }




    //审批 》 查看贷款申请
    @GetMapping("/loanInfo/{no}")
    public ModelAndView infoLoan(@PathVariable("no") String no,ModelAndView modelAndView) throws FindException {
        log.info("-----> 审批/查看贷款申请  url：loanInfo/{}",no);
        List<LoanApplication> loans = loanService.findLoanByNoAndStatus(no.trim(), LoanStatusEnum.LOAN_STATUS_ENUM_WEI_CHU_LI);
        if(loans.size() > 1){
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        modelAndView.setViewName("loanApplication/loanDetail");
        modelAndView.addObject("loan",loans.get(0));
        return  modelAndView;
    }




    @GetMapping("/agree")
    @ResponseBody
    public ReturnT agreeLoanApplication(String no,@SessionAttribute("user") Customer customer) throws FindException {
        loanService.agreeloanApplication(no,customer.getId());
        return ReturnT.SUCCESS;
    }




    @GetMapping("/notAgree")
    @ResponseBody
    public ReturnT notAgreeLoanApplication(String no){
        loanService.notAgreeloanApplication(no);
        return ReturnT.SUCCESS;
    }




}
