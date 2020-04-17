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
     * 设置信用分初始值为500分
     * @param customer
     */
    public void  addCustomer(Customer customer) throws FindException;

    /**
     * 删除cusotmer
     * 删除信用分
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




    boolean modifyPassword(String idCard,String oldPassword,String newPassword);



    boolean modifyPassword(String idCard,String password);


}
