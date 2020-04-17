package com.liuchen.bishe.bishe.controller;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.DeleteException;
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
    @ResponseBody
    public ReturnT repayment(String no,String status,@SessionAttribute("user") Customer customer){
        int customerId = customer.getId();
        if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_XUQI.getName())) {
            constractService.repayment(no.trim(),ConstractEnum.CONSTRACT_ENUM_YU_QI_MONEY,customerId);
            return ReturnT.SUCCESS;
        }


        if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_WEIDAOQI.getName())) {
            constractService.repayment(no.trim(),ConstractEnum.CONSTRACT_ENUM_TI_QIAN_MONEY,customerId);
            return ReturnT.SUCCESS;
        }


        if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_TODAY.getName())) {
            constractService.repayment(no.trim(),ConstractEnum.CONSTRACT_ENUM_AN_SHI_MONEY,customerId);
            return ReturnT.SUCCESS;
        }
        return ReturnT.FAIL;
    }


    @GetMapping("/info/{no}/{status}")
    public String infoContract(@PathVariable("no") String no, @PathVariable("status") String status, Map model) throws FindException {

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
        /**
         * TODO:查看合同详情，有bug。PDF不能显示中文。
         * 我的想法：
         *  查看合同详情用pdf显示
         *
         * 2: 什么还没有弄
         *  - 首页
         *  - 用户登录之后页面的隐藏 和权限的管理
         */

        return "test1";
    }

    @ResponseBody
    @GetMapping("/deleteContract/{no}")
    public ReturnT deleteContractByNo(@PathVariable("no") String no) throws DeleteException {
        constractService.deleteContractByNo(no);
        return ReturnT.SUCCESS;
    }









}
