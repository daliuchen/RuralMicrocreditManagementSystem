package com.liuchen.bishe.bishe.controller;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.service.AdminService;
import com.liuchen.bishe.bishe.util.AddressUtil;
import com.liuchen.bishe.bishe.vo.ReturnT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @program: bishe
 * @description: 管理员controller
 * @author: liuchen
 * @create: 2020-02-19 10:07
 **/

@Controller
@RequestMapping("/admin")
@Slf4j
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/index")
    @ResponseBody
    public ReturnT getAllAdmin(int offset,int limit,String idCard) throws FindException {

        log.info("----> AdminController.getAllAdmin"+idCard+":"+offset+";"+limit);
        PageInfo pageInfo = null;
        if("".equals(idCard)){
            //分页查找
           pageInfo = adminService.getAllAdmin(offset,limit,null);
        }else{
            //搜索框查找
            pageInfo = adminService.getAllAdmin(offset,limit,idCard.trim());
        }
        return new ReturnT(pageInfo);
    }


    //批量删除admin
    @PostMapping("/deletes")
    @ResponseBody
    public ReturnT deleteCustomerS(@RequestParam(value = "idCards[]")  String[] idCards ){
        System.out.println(idCards);

        for (String id :
                idCards) {
            adminService.deleteCustomer(id.trim());
        }
        return ReturnT.SUCCESS;
    }

    @GetMapping("/delete/{idCard}")
    @ResponseBody
    public ReturnT deleteAdmin(@PathVariable("idCard") String idCard ){
        System.out.println("AdminController.deleteAdmin"+idCard);
        adminService.deleteCustomer(idCard.trim());
        return ReturnT.SUCCESS;
    }

    //添加admin
    @RequestMapping("/add")
    public String addAdmin(Customer customer,
                            @RequestParam("picture1") MultipartFile picture,
                            @RequestParam("idpicture1") MultipartFile idCardPicture,
                            @RequestParam("address1") String address1,
                            @RequestParam("address2") String address2,
                            @RequestParam("address3") String address3
    ) throws FindException {



        String address = AddressUtil.spellingAddress(address1, address2, address3);
        customer.setAddress(address);

        try {
            customer.setPicture(picture.getBytes());
            customer.setIdPicture(idCardPicture.getBytes());
            String password = DigestUtils.md5DigestAsHex(customer.getPassword().getBytes());
            customer.setPassword(password);
            customer.setRole("admin");
        } catch (IOException e) {
            e.printStackTrace();
        }

        adminService.addCustomer(customer);
        return "util/addAdminSuccess";
    }


    @GetMapping("/showModifyCusotmer/{idCard}")
    public ModelAndView getAdminInfo(@PathVariable("idCard") String idCard,ModelAndView modelAndView) throws FindException {
        modelAndView.setViewName("admin/editAdmin");
        Customer customer = adminService.getCustomerByIdCard(idCard.trim());
        modelAndView.addObject("customer",customer);
        return  modelAndView;
    }



    //修改admin
    @PostMapping("/modifyAdmin")
    public String modifyCustomer(Customer customer,
                                 @RequestParam("picture1") MultipartFile picture,
                                 @RequestParam("idpicture1") MultipartFile idCardPicture,
                                 @RequestParam("address1") String address1,
                                 @RequestParam("address2") String address2,
                                 @RequestParam("address3") String address3
    ){
        try {
            String address = AddressUtil.spellingAddress(address1, address2, address3);
            customer.setAddress(address);

            //判断用户有没有上传头像
            if(picture.getSize() == 0){
                customer.setPicture(null);
            }else {
                customer.setPicture(picture.getBytes());
            }
            //判断用户有么有上传图片
            if(idCardPicture.getSize() == 0) {
                customer.setIdPicture(null);
            }else {
                customer.setIdPicture(idCardPicture.getBytes());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        adminService.modifyCustomer(customer,customer.getIdCard());
        return "util/addAdminSuccess";
    }






}
