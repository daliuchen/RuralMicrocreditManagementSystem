package com.liuchen.bishe.bishe.ExceptionController;

import com.liuchen.bishe.bishe.exception.DeleteException;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.vo.ReturnT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @program: bishe
 * @description: 异常处理
 * @author: liuchen
 * @create: 2020-02-16 19:23
 **/

@ControllerAdvice
@ResponseBody
@Slf4j
public class exceptionController {


    @ExceptionHandler(value = FindException.class)
    public ReturnT findException( Exception e){
        log.info("----> 异常消息{}, 异常栈 {}",e.getMessage(),e.getStackTrace());
        return ReturnT.FAIL;
    }
    @ExceptionHandler(value = DeleteException.class)
    public ReturnT deleteException(){
        return ReturnT.FAIL;
    }


}
