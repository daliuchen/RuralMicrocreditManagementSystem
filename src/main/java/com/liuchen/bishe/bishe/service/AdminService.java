package com.liuchen.bishe.bishe.service;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.vo.ReturnT;

public interface AdminService {

    /**
     * 分页查找，
     * @param offset
     * @param limit
     * @return
     */
    public PageInfo getAllAdmin(int offset, int limit,String idCard) throws FindException;

    /**
     * 删除 admin
     * @param id
     */
    public void deleteCustomer(String id);


    /**
     * 添加admin
     * @param customer
     */
    public void addCustomer(Customer customer);


    /**
     * 通过idCard来查找admin
     * @param idCard
     * @return
     * @throws FindException
     */
    public Customer getCustomerByIdCard(String idCard) throws FindException;


    /**
     * 修改admin
     * @param customer
     * @param idCard
     */
    public void  modifyCustomer(Customer customer,String idCard);

}
