package com.liuchen.bishe.bishe.controller;

import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.service.IndexService;
import com.liuchen.bishe.bishe.service.LoanService;
import com.liuchen.bishe.bishe.vo.ReturnT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * @program: bishe
 * @description: 首页controller
 * @author: liuchen
 **/
@RestController
@Slf4j
@RequestMapping("/index")
public class IndexController {

    @Autowired
    private IndexService indexService;



    /*

      管理员：
            用折线图或者柱状图显示 这一年来贷款合同的变化（按照每个月）
     */


    @GetMapping("/dashBoard")
    public ReturnT indexDashBorad(@SessionAttribute("role") String role, String year ){
        log.info("------> url:index/dashBoard");
            //通过role来判断当前登录用户的状态
        Map<String, List<Integer>> map=null;

        if("0".equals(role)){
            //普通用户

             return new ReturnT<>(300,"0");
        }else {
            //如果year为-1 默认查找今年的数据
            if ("-1".equals(year)) {
                log.info("-----> year:{}，默认查找今年的贷款情况", year);
                LocalDateTime now = LocalDateTime.now();
                //得到年
                int year1 = now.getYear();
                map = indexService.findCustomerContractStatusWithMonth((year1 + "").trim());

            } else {
                log.info("-----> year:{},查找 {} 年的数据", year,year);
                map = indexService.findCustomerContractStatusWithMonth(year);
            }
        }
            return  new ReturnT(map);

    }


    @GetMapping("/infoContract")
    public ReturnT infoContractByStatus(String status) throws FindException {
        log.info("------> url:index/infoContract");
         int count = indexService.infoContract(status);
         return new ReturnT<>(count);
    }


    @GetMapping("/infoLoanApplication")
    public ReturnT infoLoanApplication() throws FindException {
        log.info("------> url:index/infoLoanApplication");
       return new ReturnT<>(indexService.infoLoanApplication());
    }

    //客户登录首页啥都不干



}





