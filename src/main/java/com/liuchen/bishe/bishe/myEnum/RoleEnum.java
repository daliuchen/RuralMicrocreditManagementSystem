package com.liuchen.bishe.bishe.myEnum;

/**
 * 用户身份枚举
 */
public enum RoleEnum {

    ROLE_ENUM_ADMIN("admin"),
    ROLE_ENUM_SUPER_ADMIN("superadmin"),
    ROLE_ENUM_CUSTOMER("customer");


    private String name;

    RoleEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
