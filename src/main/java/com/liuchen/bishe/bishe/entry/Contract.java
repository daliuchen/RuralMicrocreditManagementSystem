package com.liuchen.bishe.bishe.entry;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @program: bishe
 * @description: contract
 * @author: liuchen
 * @create: 2020-02-08 17:49
 **/
@Component
public class Contract implements Serializable {

    private Integer id;
    private String no;
    private Customer customer; //对应的外键
    private String detail;
    private Date begin;
    private Date end;
    private BigDecimal money;
    private Date moneyBack;
    private  String status;
    private  String contractStatus;//合同完成之后标记用户是否是提前还款，按时还款，逾期还款.
    private  int isDelete;
    private  Customer  assessingOfficer;//操作元
    private  LoanApplication loan; //贷款申请
    private Integer overdue; //逾期



    public Contract() {}

    public Contract(Integer id, String no, Customer customer, String detail, Date begin, Date end, BigDecimal money, Date moneyBack, String status, String contractStatus, int isDelete, Customer assessingOfficer, LoanApplication loan, Integer overdue) {
        this.id = id;
        this.no = no;
        this.customer = customer;
        this.detail = detail;
        this.begin = begin;
        this.end = end;
        this.money = money;
        this.moneyBack = moneyBack;
        this.status = status;
        this.contractStatus = contractStatus;
        this.isDelete = isDelete;
        this.assessingOfficer = assessingOfficer;
        this.loan = loan;
        this.overdue = overdue;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Date getBegin() {
        return begin;
    }

    public void setBegin(Date begin) {
        this.begin = begin;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public Date getMoneyBack() {
        return moneyBack;
    }

    public void setMoneyBack(Date moneyBack) {
        this.moneyBack = moneyBack;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(String contractStatus) {
        this.contractStatus = contractStatus;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
    }

    public Customer getAssessingOfficer() {
        return assessingOfficer;
    }

    public void setAssessingOfficer(Customer assessingOfficer) {
        this.assessingOfficer = assessingOfficer;
    }

    public LoanApplication getLoan() {
        return loan;
    }

    public void setLoan(LoanApplication loan) {
        this.loan = loan;
    }

    public Integer getOverdue() {
        return overdue;
    }

    public void setOverdue(Integer overdue) {
        this.overdue = overdue;
    }

    @Override
    public String toString() {
        return "Contract{" +
                "id=" + id +
                ", no='" + no + '\'' +
                ", customer=" + customer +
                ", detail='" + detail + '\'' +
                ", begin=" + begin +
                ", end=" + end +
                ", money=" + money +
                ", moneyBack=" + moneyBack +
                ", status='" + status + '\'' +
                ", contractStatus='" + contractStatus + '\'' +
                ", isDelete=" + isDelete +
                ", assessingOfficer=" + assessingOfficer +
                ", loan=" + loan +
                ", overdue=" + overdue +
                '}';
    }
}
