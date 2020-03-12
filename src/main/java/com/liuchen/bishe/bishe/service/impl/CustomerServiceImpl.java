package com.liuchen.bishe.bishe.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.dao.CustomerMapper;
import com.liuchen.bishe.bishe.exception.AdminException;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.exception.SuperAdminException;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.service.CustomerService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @program: bishe
 * @description: CustomerServiceImpl
 * @author: liuchen
 * @create: 2020-02-09 13:42
 **/

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
   private CustomerMapper customerMapper;





    @Override
    public Customer validateCustomer(String account, String password) throws AdminException, SuperAdminException, FindException {

        List<Customer> customers = customerMapper.findCustomerByIdCard(account,null);
        if(true == customers.isEmpty()){
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        Customer customer = customers.get(0);

        if( false == password.equals(customer.getPassword()) ){
            return  null;
        }else{
            if("admin".equals(customer.getRole())) {
                throw new AdminException();
            }
            if("superAdmin".equals(customer.getRole())){
                throw new SuperAdminException();
            }
            return customer;

        }
    }




    @Override
    public void addCustomer(Customer customer) {

            customerMapper.addCustomer(customer);


    }




    @Override
    public void deleteCustomer(String idCard) {
        customerMapper.deleteCustomer(idCard.trim());
    }




    @Override
    @Transactional
    public void updateCustomer(Customer customer, String idCard,String role) {
        List<Customer> admins = customerMapper.findCustomerByIdCard(idCard, role);
        if(admins.get(0).equals(customer)){
            return;
        }
        if("0,-1,-2".equals(customer.getAddress())){
            return;
        }
        customerMapper.updateCustomerWithPhoneEmailAddressAddressDetailPicture(customer,idCard);

    }




    @Override
    public PageInfo<Customer> findAllCusotmerByPage(int offset,int pageNumber) {

        Page<Object> page = PageHelper.offsetPage(offset, pageNumber);
        List<Customer> customers = customerMapper.findCustomerByIdCard(null,"customer");

        PageInfo<Customer> customerPageInfo = new PageInfo<>(customers);
        return customerPageInfo;

    }




    @Override
    public Customer findCustomerByIdCard(String idCard) throws FindException {
        List<Customer> customers = customerMapper.findCustomerByIdCard(idCard,"customer");
        if(true == customers.isEmpty()){
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        return customers.get(0);
    }




}
