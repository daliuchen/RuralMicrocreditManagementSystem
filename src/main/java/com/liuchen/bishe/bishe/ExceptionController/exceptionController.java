package com.liuchen.bishe.bishe.ExceptionController;

import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.vo.ReturnT;
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
public class exceptionController {


    @ExceptionHandler(value = FindException.class)
    @ResponseBody
    public ReturnT findException(){
        return ReturnT.FAIL;
    }


}
