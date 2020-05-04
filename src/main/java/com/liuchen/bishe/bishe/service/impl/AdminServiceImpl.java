package com.liuchen.bishe.bishe.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.dao.AddressMapper;
import com.liuchen.bishe.bishe.dao.CustomerMapper;
import com.liuchen.bishe.bishe.dao.ScoreMapper;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.myEnum.RoleEnum;
import com.liuchen.bishe.bishe.service.AdminService;
import com.liuchen.bishe.bishe.util.GetAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @program: bishe
 * @description: AdminServiceImpl
 * @author: liuchen
 * @create: 2020-02-19 10:22
 **/
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private CustomerMapper customerMapper;


    // 工具类，拼接地址
    @Autowired
    private GetAddress getAddress;


    @Autowired
    private ScoreMapper scoreMapper;


    @Override
    public PageInfo getAllAdmin(int offset, int limit, String idCard) throws FindException {
        Page<Object> page = PageHelper.startPage(offset, limit);
        List<Customer> admins = customerMapper.findCustomerByIdCard(idCard, "admin");

        if (true == admins.isEmpty()) {
            throw new FindException("管理员index 查找失败 ", ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }

        for (Customer admin :
                admins) {
            String address = getAddress.getCustomerAddress(admin.getAddress(), admin.getAddressDetail());
            admin.setAddress(address);
        }


        PageInfo<Customer> pageInfo = new PageInfo<>(admins);
        return pageInfo;
    }


    @Override
    public void deleteCustomer(String id) {
        customerMapper.deleteCustomer(id);
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addCustomer(Customer customer) throws FindException {
        customerMapper.addCustomer(customer);

        //TODO: 获取不了 自增的ID 在xml文件中配置页配置好了，但就是获取不到，解决方法 在查一遍 就OK


        List<Customer> customers = customerMapper.findCustomerByIdCard(customer.getIdCard(), null);
        if (customers.size() != 1) {
            throw new FindException("添加用户出错，", ExceptionCodeEnum.EXCEPTION_CODE_ENUM_FINDMANY);
        }

        scoreMapper.addScore(500, customers.get(0).getId());

    }


    @Override
    public Customer getCustomerByIdCard(String idCard) throws FindException {
        List<Customer> admins = customerMapper.findCustomerByIdCard(idCard, "admin");
        if (true == admins.isEmpty()) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        if (true == admins.size() > 1) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_FINDMANY);
        }
        return admins.get(0);
    }


    @Transactional
    @Override
    public void modifyCustomer(Customer customer, String idCard) {
        List<Customer> admins = customerMapper.findCustomerByIdCard(idCard, RoleEnum.ROLE_ENUM_ADMIN.getName());
        if (admins.get(0).equals(customer)) {

            if ("0,-1,-2".equals(customer.getAddress())) {
                return;
            }

        }


        customerMapper.updateCustomerWithPhoneEmailAddressAddressDetailPicture(customer, idCard);
    }


}
