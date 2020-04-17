package com.liuchen.bishe.bishe.exception;

import com.liuchen.bishe.bishe.entry.Customer;

/**
 * @program: bishe
 * @description: 超级管理元
 * @author: liuchen
 * @create: 2020-02-17 11:23
 **/
public class SuperAdminException extends Exception {

    private Customer customer;

    public SuperAdminException(Customer customer) {
        this.customer = customer;
    }

    public SuperAdminException(String message, Customer customer) {
        super(message);
        this.customer = customer;
    }

    public SuperAdminException(String message, Throwable cause, Customer customer) {
        super(message, cause);
        this.customer = customer;
    }

    public SuperAdminException(Throwable cause, Customer customer) {
        super(cause);
        this.customer = customer;
    }

    public SuperAdminException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, Customer customer) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.customer = customer;
    }

    public Customer getCustomer() {
        return customer;
    }
}
