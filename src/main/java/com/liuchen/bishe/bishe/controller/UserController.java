package com.liuchen.bishe.bishe.controller;

import com.github.pagehelper.PageInfo;

import com.liuchen.bishe.bishe.dao.CustomerMapper;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.AdminException;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.exception.SuperAdminException;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.myEnum.RoleEnum;
import com.liuchen.bishe.bishe.service.CustomerService;
import com.liuchen.bishe.bishe.util.AddressUtil;
import com.liuchen.bishe.bishe.vo.ReturnT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
@Slf4j
public class UserController {

    @Autowired
    private CustomerService customerService;


    /**
     * 登录
     * @param attributes
     * @param account
     * @param password
     * @param code
     * @param session
     * @return
     * @throws FindException
     */
    @PostMapping("/login")
    public ModelAndView doLogin(RedirectAttributes attributes, @NotNull String account, @NotNull String password, @NotNull String code, HttpSession session)   {
        ModelAndView modelAndView = new ModelAndView();

        String role = null;
        String code1 = (String) session.getAttribute("code");
        Customer customer = null;
        if (false == code1.equals(code)) {
            //抛出异常
            modelAndView.setViewName("redirect:/toLogin");
            attributes.addFlashAttribute("message","验证码错误");
            log.info("----> 验证码错误:错误验证码:{},系统验证码:{} ",code,code1);
            return modelAndView;
        }


        try {
            customer = customerService.validateCustomer(account, password);
            //说明是普通用户
            log.debug(" ----》 普通用户  登录  用户名：{}  用户idCard {}  用户role {}",customer.getName(),customer.getIdCard(),customer.getRole());
            role="0";
            session.setAttribute("user", customer);


        } catch (AdminException e) {
            //说明登陆的用户的管理员
            role="-1";
            customer = e.getCustomer();
            session.setAttribute("user1", customer);
            log.debug(" ----》 管理员  登录  用户名：{}  用户idCard {}  用户role {}",customer.getName(),customer.getIdCard(),customer.getRole());


        } catch (SuperAdminException e) {
            //说明登陆的用户是超级管理  超级管理元可以添加管理员
            role="1";
            customer = e.getCustomer();
            session.setAttribute("user1", customer);
            log.debug(" ----》 超级管理元  登录  用户名：{}  用户idCard {}  用户role {}",customer.getName(),customer.getIdCard(),customer.getRole());


        } catch (FindException e) {
            //用户账号不存在
            modelAndView.setViewName("redirect:/toLogin");
            attributes.addFlashAttribute("message","密码或者用户错误");//spring mvc 自己带的，之前的redirect会将参数放到url中（get），这个是放在session里面，页面跳转之后就直接活期
            log.debug("用户名或者密码错误");
            return  modelAndView;
        }

        if (customer == null) {
            //抛出异常
            //密码或者账号错误
            modelAndView.setViewName("redirect:/toLogin");
            attributes.addFlashAttribute("message","密码或者用户错误");//spring mvc 自己带的，之前的redirect会将参数放到url中（get），这个是放在session里面，页面跳转之后就直接活期
            log.debug("用户名或者密码错误");
            return  modelAndView;
        }
        //设置角色
        session.setAttribute("role",role);

        //如果是customer直接到我的业务里面我的贷款申请
        if("0".equals(role)){
            modelAndView.setViewName("redirect:/MyLoan");
            return modelAndView;
        }

        modelAndView.setViewName("index/index");
        log.info(" 姓名:{} , role:{} , 登录成功",account,customer.getRole());
        return modelAndView;
    }

    /**
     *  TODO:测试留意，新添了 添加时候身份判断，信用分的初始化，删除客户同时页要删除信用风
     * 添加用户，和注册用户同一个url
     * @param customer  客户
     * @param picture   头像
     * @param idCardPicture 身份证号
     * @param address1  地址 省
     * @param address2  地址 市
     * @param address3  地址 县
     * @param addCustomer   用来区分是添加用户还是注册  1 是添加 -1是注册
     * @return  页面
     */
    @RequestMapping("/add")
    public String doRegiest(Customer customer,
                            @RequestParam("picture1") MultipartFile picture,
                            @RequestParam("idpicture1") MultipartFile idCardPicture,
                            @RequestParam("address1") String address1,
                            @RequestParam("address2") String address2,
                            @RequestParam("address3") String address3,
                            @RequestParam("addCustomer") String addCustomer,
                            HttpSession session

    ) throws FindException {


        String address = AddressUtil.spellingAddress(address1, address2, address3);
        customer.setAddress(address);

        try {
            customer.setPicture(picture.getBytes());
            customer.setIdPicture(idCardPicture.getBytes());
            String password = DigestUtils.md5DigestAsHex(customer.getPassword().getBytes());
            customer.setPassword(password);


            //得到session里面的role 设置角色
            String role = (String)session.getAttribute("role");
            if(role == null || "0".equals(role)){
                //注册页面 或者普通用户
                customer.setRole("customer");
            }else{
                if("1".equals(role)){
                    //超级管理员
                    customer.setRole("admin");
                }
                if("-1".equals(role)){
                    //普通管理员
                    customer.setRole("customer");
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        customerService.addCustomer(customer);
        if ("-1".equals(addCustomer) == true) {
            return "util/regiestSuccess";
        } else {
            return "util/addSuccess";
        }


    }


    /**
     * user index
     * @param offset
     * @param limit
     * @param text
     * @return
     * @throws FindException
     */
    @RequestMapping("/index")
    @ResponseBody
    public ReturnT findAllCusomterByPage(int offset, int limit, String text) throws FindException {
        if (true == "".equals(text.trim())) {
            System.out.println("正常查找" + offset + ":" + limit);
            PageInfo<Customer> customers = customerService.findAllCusotmerByPage(offset, limit);
            return new ReturnT(customers);
        } else {
            //搜索用户
            System.out.println("搜索用户" + offset + ":" + limit + ":" + text);
            Customer customer = customerService.findCustomerByIdCard(text.trim());
            ArrayList<Customer> customers = new ArrayList<>();
            customers.add(customer);
            PageInfo<Customer> page = new PageInfo<>();
            page.setList(customers);
            page.setTotal(1);
            return new ReturnT(page);
        }

    }

    @PostMapping("/delete/{idCard}")
    @ResponseBody
    public ReturnT deleteCustomerByIdCard(@PathVariable("idCard") String idCard) {
        customerService.deleteCustomer(idCard);
        return ReturnT.SUCCESS;
    }


    @PostMapping("/deletes")
    @ResponseBody
    public ReturnT deleteCustomerS(@RequestParam(value = "idCards[]") String[] idCards) {
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
        System.out.println("model and View " + customer);
        ModelAndView model = new ModelAndView("customer/editCusotmer");
        model.addObject("customer", customer);
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
    ) {
        try {
            String address = AddressUtil.spellingAddress(address1, address2, address3);
            customer.setAddress(address);

            //判断用户有没有上传头像
            if (picture.getSize() == 0) {
                customer.setPicture(null);
            } else {
                customer.setPicture(picture.getBytes());
            }
            //判断用户有么有上传图片
            if (idCardPicture.getSize() == 0) {
                customer.setIdPicture(null);
            } else {
                customer.setIdPicture(idCardPicture.getBytes());
            }


        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("UserController.modifyCustomer" + customer);
        customerService.updateCustomer(customer, customer.getIdCard(), RoleEnum.ROLE_ENUM_CUSTOMER.getName());
        return "util/addSuccess";
    }


    @GetMapping("/showInfoCustmer/{idCard}")
    public ModelAndView showInfoCustmer(@PathVariable("idCard") String idCard) throws FindException {
        Customer customer = customerService.findCustomerByIdCard(idCard.trim());
        System.out.println("model and View " + customer);
        ModelAndView model = new ModelAndView("customer/detailCustomer");
        model.addObject("customer", customer);
        return model;
    }


    @GetMapping("/customerlogout")
    @ResponseBody
    public ReturnT logout(HttpSession session){

        log.info("---->普通 用户 成功退出");
        session.removeAttribute("user");
        return ReturnT.SUCCESS;
    }



    @GetMapping("/adminLogout")
    @ResponseBody
    public ReturnT adminLogout(HttpSession session){

        log.info("---->普通 用户 成功退出");
        session.removeAttribute("user1");
        return ReturnT.SUCCESS;
    }




    //修改密码
    @PostMapping("/modifyPassword")
    @ResponseBody
    public ReturnT modifyPassword(String oldPassword,String newPassword,HttpSession session){
        Customer customer=null;
        String role = (String)session.getAttribute("role");

        if ("0".equals(role)){
            customer = (Customer) session.getAttribute("user");
        }else{
            customer = (Customer) session.getAttribute("user1");
        }



        if(oldPassword.equals(newPassword) == false){
            //不相等
            return  new ReturnT(300,"两次输入的密码不一样");
        }else{
            boolean b = customerService.modifyPassword(customer.getIdCard(), oldPassword.trim(), newPassword.trim());
            if(b == false){
                return  new ReturnT(301,"原密码错误");
            }else {
                return ReturnT.SUCCESS;
            }
        }


    }



    //找回密码
    @PostMapping("/retriveve")
    @ResponseBody
    public ReturnT retrivevePassword(String idCard,String rcode,String password1,@SessionAttribute("rcode") String code){
        log.info("retriveve,参数：idCard:{},rcode:{},password1:{},code:{}",idCard,rcode,password1,code);
            if(code.equals(rcode) == false){
                log.info("验证码不想等");
                return ReturnT.FAIL;
            }
        boolean b = customerService.modifyPassword(idCard.trim(), password1.trim());
            if(b == false){
                log.info("修改失败");
                return ReturnT.FAIL;
            }else{
                log.info("修改成功");
                return ReturnT.SUCCESS;
            }
    }




}
