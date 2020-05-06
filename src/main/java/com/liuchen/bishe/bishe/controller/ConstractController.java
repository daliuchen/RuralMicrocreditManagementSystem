package com.liuchen.bishe.bishe.controller;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.DeleteException;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.exception.SystemErrorException;
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
            if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_OVER.getName())) {
                PageInfo pa = constractService.findAllCusotmerByPage(offset, limit,null, ConstractEnum.CONSTRACT_ENUM_OVER);
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

            if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_OVER.getName())) {
                PageInfo pa = constractService.findAllCusotmerByPage(offset, limit,idCard.trim(), ConstractEnum.CONSTRACT_ENUM_OVER);
                return new ReturnT(pa);
            }


        }
        return ReturnT.FAIL;
    }


    /**
     *  已经还款
     * @param       no        合同号
     * @param       status     合同状态
     * @param       customer    session里面的管理员
     * @return
     */
    @GetMapping("/repayment")
    @ResponseBody
    public ReturnT repayment(String no,String status,@SessionAttribute("user1") Customer customer){
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
        } else if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_WEIDAOQI.getName())) {
            contract = constractService.getContractByNoAndStatus(no.trim(),ConstractEnum.CONSTRACT_ENUM_WEIDAOQI);
        } else if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_TODAY.getName())) {
            contract =  constractService.getContractByNoAndStatus(no.trim(),ConstractEnum.CONSTRACT_ENUM_TODAY);
        }
        else if (status.trim().equals(ConstractEnum.CONSTRACT_ENUM_OVER.getName())) {
            contract =  constractService.getContractByNoAndStatus(no.trim(),ConstractEnum.CONSTRACT_ENUM_OVER);
        }else{
            throw new SystemErrorException();
        }
        model.put("contract",contract);
        return "constract/constractIndeInfo";
    }

    @ResponseBody
    @GetMapping("/deleteContract/{no}")
    public ReturnT deleteContractByNo(@PathVariable("no") String no) throws DeleteException {
        constractService.deleteContractByNo(no);
        return ReturnT.SUCCESS;
    }


    /**
     * 撤销合同
     */

    @GetMapping("/backContract/{no}")
    @ResponseBody
    public ReturnT backContract(@PathVariable("no") String no){
            constractService.updateContractByLoanNo(no.trim(),ConstractEnum.CONSTRACT_ENUM_NOTYIFANG);
            return  ReturnT.SUCCESS;
    }




    /**
     * 生成合同
     * @param no
     * @return
     */
    @GetMapping("/goContract/{no}")
    @ResponseBody
    public ReturnT goContract(@PathVariable("no") String no){
        constractService.goContact(no.trim());
        return ReturnT.SUCCESS;
    }


    /**
     * 查找当前登录用户的合同
     * @param offset
     * @param limit
     * @param idCard
     * @param customer      当前登录的用户
     * @return
     * @throws FindException
     */
    @GetMapping("/myContract")
    @ResponseBody
    public ReturnT myContract(int offset,int limit,String idCard,@SessionAttribute("user") Customer customer) throws FindException {
        //当前登录用户id
        int id = customer.getId();
        PageInfo<Contract> pageInfo = constractService.findMyContract(offset, limit, id);
        return new ReturnT(pageInfo);
    }











}
