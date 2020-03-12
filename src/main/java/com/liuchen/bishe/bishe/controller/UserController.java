package com.liuchen.bishe.bishe.controller;

import com.github.pagehelper.PageInfo;

import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.AdminException;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.exception.SuperAdminException;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.myEnum.RoleEnum;
import com.liuchen.bishe.bishe.service.CustomerService;
import com.liuchen.bishe.bishe.util.AddressUtil;
import com.liuchen.bishe.bishe.vo.ReturnT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.ArrayList;

/**
 * @program: bishe
 * @description: userController
 * @author: liuchen
 * @create: 2020-02-08 22:14
 **/

@Controller
@RequestMapping("/user")
public class UserController {

        @Autowired
        private CustomerService customerService;



        @PostMapping("/login")
        public String doLogin(@NotNull String account, @NotNull String password, @NotNull String code, HttpSession session) throws FindException {
            String code1 = (String) session.getAttribute("code");
            Customer customer = null;
            if(false == code1.equals(code)){
                //抛出异常
            }


            try {
                 customer = customerService.validateCustomer(account, password);
                //说明是普通用户

            } catch (AdminException e) {
                //说明登陆的用户的管理员

            } catch (SuperAdminException e) {
                //说明登陆的用户是超级管理  超级管理元可以添加管理员
            }
            if(customer == null ){
                //抛出异常
                //密码或者账号错误
                throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
            }

             session.setAttribute("user",customer);

            return "index";
        }

        @RequestMapping("/add")
        public String doRegiest(Customer customer,
                              @RequestParam("picture1") MultipartFile picture,
                              @RequestParam("idpicture1") MultipartFile idCardPicture,
                              @RequestParam("address1") String address1,
                              @RequestParam("address2") String address2,
                              @RequestParam("address3") String address3,
                                @RequestParam("addCustomer") String addCustomer
        ){



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

            customerService.addCustomer(customer);
            if("-1".equals(addCustomer) == true){
                return "util/regiestSuccess";
            }else{
                return "util/addSuccess";
            }




        }







        @RequestMapping("/index")
        @ResponseBody
        public ReturnT findAllCusomterByPage(int offset, int limit,String text) throws FindException {
            if( true == "".equals(text.trim())){
                System.out.println("正常查找"+offset+":"+limit);
                PageInfo<Customer> customers = customerService.findAllCusotmerByPage(offset, limit);
                return  new ReturnT(customers);
            }else{
                //搜索用户
                System.out.println("搜索用户"+offset+":"+limit+":"+text);
                Customer customer = customerService.findCustomerByIdCard(text.trim());
                ArrayList<Customer> customers = new ArrayList<>();
                customers.add(customer);
                PageInfo<Customer> page = new PageInfo<>();
                page.setList(customers);
                page.setTotal(1);
                return  new ReturnT(page);
            }

        }

        @PostMapping("/delete/{idCard}")
        @ResponseBody
        public ReturnT deleteCustomerByIdCard(@PathVariable("idCard") String idCard){
            customerService.deleteCustomer(idCard);
            return ReturnT.SUCCESS;
        }


        @PostMapping("/deletes")
        @ResponseBody
        public ReturnT deleteCustomerS(@RequestParam(value = "idCards[]")  String[] idCards ){
            System.out.println(idCards);

            for (String id :
                    idCards) {
                customerService.deleteCustomer(id);
            }
            return ReturnT.SUCCESS;
        }


        @GetMapping("/showModifyCusotmer/{idCard}")
        public ModelAndView showModifyCustomer(@PathVariable("idCard") String idCard) throws FindException {
            Customer customer = customerService.findCustomerByIdCard(idCard.trim());
            System.out.println("model and View "+customer);
            ModelAndView model = new ModelAndView("customer/editCusotmer");
            model.addObject("customer",customer);
            return model;
        }


        @PostMapping("/modifyCusotmer")
        public String modifyCustomer(Customer customer,
                                @RequestParam("picture1") MultipartFile picture,
                                @RequestParam("idpicture1") MultipartFile idCardPicture,
                                @RequestParam("address1") String address1,
                                @RequestParam("address2") String address2,
                                @RequestParam("address3") String address3,
                                @RequestParam("addCustomer") String addCustomer
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
            System.out.println("UserController.modifyCustomer"+customer);
            customerService.updateCustomer(customer,customer.getIdCard(), RoleEnum.ROLE_ENUM_CUSTOMER.getName());
            return "util/addSuccess";
        }



        @GetMapping("/showInfoCustmer/{idCard}")
        public ModelAndView showInfoCustmer(@PathVariable("idCard") String idCard) throws FindException {
            Customer customer = customerService.findCustomerByIdCard(idCard.trim());
            System.out.println("model and View "+customer);
            ModelAndView model = new ModelAndView("customer/detailCustomer");
            model.addObject("customer",customer);
            return model;
        }









}
