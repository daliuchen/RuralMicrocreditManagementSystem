package com.liuchen.bishe.bishe.entry;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;

/**
 * @program: bishe
 * @description: loanApplication
 * @author: liuchen
 * @create: 2020-02-08 17:42
 **/
@Component
public class LoanApplication implements Serializable {

    private int id;
    private String no;
    private Customer  customer;
    private  double money;
    private String time;
    @JsonFormat(pattern = "yyyy年MM月dd日 HH时mm分ss秒",timezone="GMT+8")
    private Date  createDate;
    private Customer   bondsman;
    private  String status;
    private   Customer assessingOfficer;
    private int isDelete;

    public LoanApplication(){}

    public LoanApplication(int id, String no, Customer customer, double money, String time, Date createDate, Customer bondsman, String status, Customer assessingOfficer, int isDelete) {
        this.id = id;
        this.no = no;
        this.customer = customer;
        this.money = money;
        this.time = time;
        this.createDate = createDate;
        this.bondsman = bondsman;
        this.status = status;
        this.assessingOfficer = assessingOfficer;
        this.isDelete = isDelete;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Customer getBondsman() {
        return bondsman;
    }

    public void setBondsman(Customer bondsman) {
        this.bondsman = bondsman;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Customer getAssessingOfficer() {
        return assessingOfficer;
    }

    public void setAssessingOfficer(Customer assessingOfficer) {
        this.assessingOfficer = assessingOfficer;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
    }

    @Override
    public String toString() {
        return "LoanApplication{" +
                "id=" + id +
                ", no='" + no + '\'' +
                ", customer=" + customer +
                ", money=" + money +
                ", time='" + time + '\'' +
                ", createDate=" + createDate +
                ", bondsman=" + bondsman +
                ", status='" + status + '\'' +
                ", assessingOfficer=" + assessingOfficer +
                ", isDelete=" + isDelete +
                '}';
    }
}
