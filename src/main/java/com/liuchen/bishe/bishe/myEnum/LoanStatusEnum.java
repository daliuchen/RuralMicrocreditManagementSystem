package com.liuchen.bishe.bishe.myEnum;

public enum LoanStatusEnum {

    LOAN_STATUS_ENUM_WEI_CHU_LI("未处理"),
    LOAN_STATUS_ENUM_NOT_PASS("不通过"),
    LOAN_STATUS_ENUM_TONG_GUO("通过"),
    LOAN_STATUS_ENUM_CHE_XIAO("撤销");

    private String name;

    LoanStatusEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
