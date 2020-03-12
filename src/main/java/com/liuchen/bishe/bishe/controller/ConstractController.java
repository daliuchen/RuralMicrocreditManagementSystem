package com.liuchen.bishe.bishe.controller;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ConstractEnum;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.service.ConstractService;
import com.liuchen.bishe.bishe.vo.ReturnT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @program: bishe
 * @description: ConstractController
 * @author: liuchen
 * @create: 2020-02-16 17:20
 **/
@Controller
@RequestMapping("/constract")
public class ConstractController {

    @Autowired
    private ConstractService constractService;


    //主页面显示
    @GetMapping("/index")
    @ResponseBody
    public ReturnT findAllCusomterByPage(int offset,  int limit,  String idCard, String status) throws FindException {

        System.out.println("ConstractController.findAllCusomterByPage");
        if (true == "".equals(idCard.trim())) {
            //页面初始化

            if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_XUQI.getName())) {
                PageInfo pa = constractService.findAllCusotmerByPage(offset,limit,null,ConstractEnum.CONSTRACT_ENUM_XUQI);
                return new ReturnT(pa);
            }


            if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_WEIDAOQI.getName())) {
                PageInfo pa = constractService.findAllCusotmerByPage(offset, limit, null,ConstractEnum.CONSTRACT_ENUM_WEIDAOQI);
                return new ReturnT(pa);
            }


            if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_TODAY.getName())) {
                PageInfo pa = constractService.findAllCusotmerByPage(offset, limit,null, ConstractEnum.CONSTRACT_ENUM_TODAY);
                return new ReturnT(pa);
            }


        }else{


            if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_XUQI.getName())) {
                PageInfo pa = constractService.findAllCusotmerByPage(offset,limit,idCard.trim(),ConstractEnum.CONSTRACT_ENUM_XUQI);
                return new ReturnT(pa);
            }


            if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_WEIDAOQI.getName())) {
                PageInfo pa = constractService.findAllCusotmerByPage(offset, limit, idCard.trim(),ConstractEnum.CONSTRACT_ENUM_WEIDAOQI);
                return new ReturnT(pa);
            }


            if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_TODAY.getName())) {
                PageInfo pa = constractService.findAllCusotmerByPage(offset, limit,idCard.trim(), ConstractEnum.CONSTRACT_ENUM_TODAY);
                return new ReturnT(pa);
            }


        }
        return ReturnT.FAIL;
    }




    //已还款
    @GetMapping("/repayment")
    public ReturnT repayment(String no,String status,@SessionAttribute("user") Customer customer){
        int customerId = customer.getId();
        if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_XUQI.getName())) {
            constractService.repayment(no.trim(),ConstractEnum.CONSTRACT_ENUM_XUQI,customerId);
            return ReturnT.SUCCESS;
        }


        if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_WEIDAOQI.getName())) {
            constractService.repayment(no.trim(),ConstractEnum.CONSTRACT_ENUM_WEIDAOQI,customerId);
            return ReturnT.SUCCESS;
        }


        if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_TODAY.getName())) {
            constractService.repayment(no.trim(),ConstractEnum.CONSTRACT_ENUM_TODAY,customerId);
            return ReturnT.SUCCESS;
        }
        return ReturnT.FAIL;
    }


    @GetMapping("/info/{no}/{status}")
    public String infoContract(@PathVariable("no") String no, @PathVariable("status") String status, Map model) throws FindException {
        //TODO:查看合同详细，合同管理还没有做，只写好了，没有测试，三个页面都是一样的。每次都传递no和status
        Contract contract = null;
        if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_XUQI.getName())) {
            contract = constractService.getContractByNoAndStatus(no.trim(),ConstractEnum.CONSTRACT_ENUM_XUQI);
        }
        if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_WEIDAOQI.getName())) {
            contract = constractService.getContractByNoAndStatus(no.trim(),ConstractEnum.CONSTRACT_ENUM_WEIDAOQI);
        }
        if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_TODAY.getName())) {
            contract =  constractService.getContractByNoAndStatus(no.trim(),ConstractEnum.CONSTRACT_ENUM_TODAY);
        }
        model.put("contract",contract);
        //TODO：使用pdf显示。支持下载
        return "test1";
    }





}
