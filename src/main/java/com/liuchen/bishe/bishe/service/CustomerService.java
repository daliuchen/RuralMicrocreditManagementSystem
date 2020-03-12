package com.liuchen.bishe.bishe.service;


import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.AdminException;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.exception.SuperAdminException;
import org.apache.catalina.User;

import java.util.List;

public interface CustomerService {

    /**
     * 验证用户
     * @param account
     * @param password
     * @return
     */
    public Customer validateCustomer(String account, String password) throws AdminException, SuperAdminException, FindException;

    /**
     * 添加customer
     * @param customer
     */
    public void  addCustomer(Customer customer);

    /**
     * 删除cusotmer
     * @param idCard
     *
     */
    public void deleteCustomer(String idCard);


    /**
     *  更新 customer
     *  @param customer
     * @param idCard
     */
    public void updateCustomer(Customer customer,String idCard,String role);


    /**
     * 分页查询
     * @param offset
     * @param pageNumber
     * @return
     */
    public PageInfo<Customer> findAllCusotmerByPage(int offset, int pageNumber);

    /**
     * 查找
        customer
     * @param idCard
     * @return
     */
    public Customer findCustomerByIdCard(String idCard) throws FindException;



}
