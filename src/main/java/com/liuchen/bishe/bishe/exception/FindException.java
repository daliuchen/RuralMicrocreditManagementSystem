package com.liuchen.bishe.bishe.exception;

import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;

/**
 * @program: bishe
 * @description: 查找失败异常
 * @author: liuchen
 * @create: 2020-02-16 11:33
 **/
public class FindException extends Exception {
   private ExceptionCodeEnum code;

    public FindException(ExceptionCodeEnum code) {
        this.code = code;
    }

    public FindException(String message, ExceptionCodeEnum code) {
        super(message);
        this.code = code;
    }

    public FindException(String message, Throwable cause, ExceptionCodeEnum code) {
        super(message, cause);
        this.code = code;
    }

    public FindException(Throwable cause, ExceptionCodeEnum code) {
        super(cause);
        this.code = code;
    }

    public FindException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, ExceptionCodeEnum code) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.code = code;
    }
}
