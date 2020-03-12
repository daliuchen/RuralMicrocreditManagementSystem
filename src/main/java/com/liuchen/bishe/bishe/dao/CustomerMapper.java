package com.liuchen.bishe.bishe.dao;

import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.vo.CustomerPictureVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CustomerMapper {



        public List<Customer> findCustomerByIdCard(@Param("idCard") String idCard,@Param("role") String role);



        public void addCustomer(@Param("customer") Customer customer);



        public void deleteCustomer(String idCard);


        /**
         * 修改 customer  这里的参数都可以为kong
         * * @param customer
         * @param idCard
         */
        public void updateCustomerWithPhoneEmailAddressAddressDetailPicture(@Param("customer") Customer customer,@Param("id") String idCard);




        public CustomerPictureVo selectCustomerPicture(String idCard);

        /**
         *   通过CustomerId 来查找
         * @param id
         * @return
         */
        public Customer findCustomerById(int id);












}
