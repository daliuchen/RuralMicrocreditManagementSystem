package com.liuchen.bishe.bishe.dao;


import com.liuchen.bishe.bishe.vo.AddressVo;

import java.util.List;

/**
 * @program: bishe
 * @description: addressMapper
 * @author: liuchen
 * @create: 2020-02-09 18:31
 **/
public interface AddressMapper {


    /**
     * 下拉框选择 根据Pid来查找
     * @param id
     * @return
     */
    public List<AddressVo> searchAddress(int id);


    /**
     * 根据id来查找
     * @param id
     * @return
     */
    public AddressVo findAddressById(int id);





}
