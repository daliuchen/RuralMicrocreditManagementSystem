package com.liuchen.bishe.bishe.dao;

import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.vo.CustomerPictureVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CustomerMapper {

        /**
         * 通过idcard和password获取cusotmer
         * @param idCard
         * @param password
         * @return
         */
        int getByIdCardAndPassword(String idCard,String password);


        public List<Customer> findCustomerByIdCard(@Param("idCard") String idCard,@Param("role") String role);



        public int addCustomer(@Param("customer") Customer customer);



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



        int updatePassword(String idCard,String password);











}
