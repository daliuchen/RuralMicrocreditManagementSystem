package com.liuchen.bishe.bishe.myEnum;

public enum ExceptionCodeEnum {

    EXCEPTION_CODE_ENUM_NOTFIND(404),
    EXCEPTION_CODE_ENUM_FINDMANY(405),
    EXCEPTION_CODE_ENUM_USERNAME_NOT_EQUAL(406);

    private int code;

    ExceptionCodeEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
