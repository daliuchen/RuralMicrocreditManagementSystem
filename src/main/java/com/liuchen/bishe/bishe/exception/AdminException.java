package com.liuchen.bishe.bishe.exception;

import com.liuchen.bishe.bishe.entry.Customer;

/**
 * @program: bishe
 * @description: 管理员
 * @author: liuchen
 * @create: 2020-02-17 11:22
 **/
public class AdminException extends Exception {

    private  Customer customer;

    public AdminException(Customer customer) {
        this.customer = customer;
    }

    public AdminException(String message, Customer customer) {
        super(message);
        this.customer = customer;
    }

    public AdminException(String message, Throwable cause, Customer customer) {
        super(message, cause);
        this.customer = customer;
    }

    public AdminException(Throwable cause, Customer customer) {
        super(cause);
        this.customer = customer;
    }

    public AdminException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, Customer customer) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.customer = customer;
    }

    public Customer getCustomer() {
        return customer;
    }
}
