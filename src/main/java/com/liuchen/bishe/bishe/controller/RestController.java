package com.liuchen.bishe.bishe.controller;


import com.liuchen.bishe.bishe.dao.*;

import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.entry.Score;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.service.ConstractService;
import com.liuchen.bishe.bishe.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

/**
 * @program: bishe
 * @description: json控制器
 * @author: liuchen
 * @create: 2020-02-09 18:28
 **/
@Controller
public class RestController {



    @Autowired
    private AddressMapper addressMapper;

    @Autowired
    private ConstractMapper constractMapper;


    @Autowired
    private ConstractService constractService;

    @Autowired
    private ScoreMapper scoreMapper;


    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private LoanMaxYearMapper loanMaxYearMapper;






    //贷款申请 输入贷款金额，查询能贷款的最大年份
    @GetMapping("/loanMoney")
    @ResponseBody
    public ReturnT getLoanYear(String money){
            if(money.trim() != "" ){
                BigDecimal decimal = new BigDecimal(money);
                List<LoanMaxYearVo> money1 = loanMaxYearMapper.findByMoney(decimal);
                if(true == money1.isEmpty()){
                    return ReturnT.FAIL;
                }
                return  new ReturnT(money1.get(0));
            }
            return ReturnT.FAIL;
    }




    //地址联动下拉框
    @GetMapping("/address")
    @ResponseBody
    public List<AddressVo> searchAddress(Integer id){
        if(id == null){
            id=0;
        }
        List<AddressVo> addressList = addressMapper.searchAddress(id);
        System.out.println(addressList.size());
        return  addressList;
    }




    //用户贷款下拉框 得到用户贷款年份 最大和最小
    @GetMapping("/customerYear")
    @ResponseBody
    public ReturnT  getCustomerYear(int  customerId){
        List<Integer> years = constractMapper.selectConstractMinMaxYear(customerId);
        if(true == years.isEmpty()){
            return ReturnT.FAIL;
        }
        return new ReturnT(years);
    }



    //用户信用分图
    @GetMapping("/CustomerScore")
    @ResponseBody
    public ReturnT getCustomerScore(Integer customerId){
        Score score = scoreMapper.findCustomerScoreById(customerId);
        if(score == null){
           return ReturnT.FAIL;
        }
        return  new ReturnT(score);
    }



    //用户贷款情况折线图
    @GetMapping("/CustomerConstract")
    @ResponseBody
    public ReturnT getCustomerConstract(Integer customerId,String year){
        Map<String, List<Integer>> constractStatus = null;

        if(true == year.equals("-1")) {
            //默认查找用户最新的数据
            List<Integer> years = constractMapper.selectConstractMinMaxYear(customerId);
            year = Collections.max(years)+"";
        }
        //下拉框选择
        // returnT里面Content的  内容是map  key 是合同状态，value 是链表
        constractStatus = constractService.findCustomerContractStatusWithMonth(customerId,year.trim());
        return new ReturnT(constractStatus);
    }



    //用户身份证
    @GetMapping("/idPicture/{idCard}")
    public void getCustomerPicture(@PathVariable("idCard") String idCard, HttpServletResponse response) throws IOException {
        System.out.println("RestController.getCustomerPicture"+idCard);
        CustomerPictureVo customerPictureVo = customerMapper.selectCustomerPicture(idCard.trim());
        response.getOutputStream().write(customerPictureVo.getIdPicture());
    }




    @GetMapping("/validateLoanPeople")
    @ResponseBody
    //验证担保人是否存在
    public ReturnT validateLoanPeople(String loanName,String loanIdCard) {
        System.out.println("RestController.validateLoanPeople");
        List<Customer> customers = customerMapper.findCustomerByIdCard(loanIdCard.trim(), null);
        if (true == customers.isEmpty()) {
            return new ReturnT(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND.getCode(), "该用户不存在");
        }
        if (false == customers.get(0).getName().equals(loanName)) {
            return new ReturnT(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_USERNAME_NOT_EQUAL.getCode(), "用户名和身份证不匹配");
        }
        return ReturnT.SUCCESS;
    }




}
