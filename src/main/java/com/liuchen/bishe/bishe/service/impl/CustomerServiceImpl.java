package com.liuchen.bishe.bishe.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.dao.ScoreMapper;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.dao.CustomerMapper;
import com.liuchen.bishe.bishe.exception.AdminException;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.exception.SuperAdminException;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.util.List;

/**
 * @program: bishe
 * @description: CustomerServiceImpl
 * @author: liuchen
 * @create: 2020-02-09 13:42
 **/

@Service
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private ScoreMapper scoreMapper;


    @Override
    public Customer validateCustomer(String account, String password) throws AdminException, SuperAdminException, FindException {
        //更具账户查找cusotmer
        List<Customer> customers = customerMapper.findCustomerByIdCard(account, null);
        if (true == customers.isEmpty()) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        Customer customer = customers.get(0);
        //密码不想等
        password = DigestUtils.md5DigestAsHex(password.getBytes());
        //
        if (false == password.equals(customer.getPassword())) {
            return null;
        } else {
            //管理员
            if ("admin".equals(customer.getRole())) {
                log.info("-----> 管理员登录: id:{}, name{}, role{}", customer.getId(), customer.getName(), customer.getRole());
                throw new AdminException(customer);
            }
            //超级管理员
            if ("superAdmin".equals(customer.getRole())) {
                log.info("-----> 超级管理员: id:{}, name{}, role{}", customer.getId(), customer.getName(), customer.getRole());
                throw new SuperAdminException(customer);
            }
            //普通用户
            log.info("-----> 普通用户登录: id:{}, name{}, role{}", customer.getId(), customer.getName(), customer.getRole());
        }
        return customer;
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addCustomer(Customer customer) throws FindException {

        int id = customerMapper.addCustomer(customer);

        List<Customer> customers = customerMapper.findCustomerByIdCard(customer.getIdCard(), null);
        if(customers.size() == 0 || customers==null){
            throw new FindException("查询失败",ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        scoreMapper.addScore(500,customers.get(0).getId());

    }


    @Override
    public void deleteCustomer(String idCard) {
        customerMapper.deleteCustomer(idCard.trim());
        List<Customer> customers = customerMapper.findCustomerByIdCard(idCard, null);
        Customer customer = customers.get(0);
        scoreMapper.deleteScore(customer.getId());
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateCustomer(Customer customer, String idCard, String role) {
        List<Customer> admins = customerMapper.findCustomerByIdCard(idCard, role);
        if (admins.get(0).equals(customer)) {
            return;
        }
        if ("0,-1,-2".equals(customer.getAddress())) {
            return;
        }
        customerMapper.updateCustomerWithPhoneEmailAddressAddressDetailPicture(customer, idCard);

    }


    @Override
    public PageInfo<Customer> findAllCusotmerByPage(int offset, int pageNumber) {

        Page<Object> page = PageHelper.offsetPage(offset, pageNumber);
        List<Customer> customers = customerMapper.findCustomerByIdCard(null, "customer");

        PageInfo<Customer> customerPageInfo = new PageInfo<>(customers);
        return customerPageInfo;

    }


    @Override
    public Customer findCustomerByIdCard(String idCard) throws FindException {
        List<Customer> customers = customerMapper.findCustomerByIdCard(idCard, "customer");
        if (true == customers.isEmpty()) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        return customers.get(0);
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean modifyPassword(String idCard, String oldPassword, String newPassword) {

        oldPassword = DigestUtils.md5DigestAsHex(oldPassword.getBytes());
        newPassword = DigestUtils.md5DigestAsHex(newPassword.getBytes());

        int count = customerMapper.getByIdCardAndPassword(idCard, oldPassword);
        if (count == 1) {
            customerMapper.updatePassword(idCard, newPassword);
            return true;
        } else {
            return false;
        }

    }


    @Override
    public boolean modifyPassword(String idCard, String password) {
        password = DigestUtils.md5DigestAsHex(password.getBytes());
        int i = customerMapper.updatePassword(idCard.trim(), password);
        return i > 0 ? true : false;
    }


}
