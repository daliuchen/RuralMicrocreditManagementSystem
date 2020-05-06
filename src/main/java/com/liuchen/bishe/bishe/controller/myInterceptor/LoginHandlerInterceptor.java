package com.liuchen.bishe.bishe.controller.myInterceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

/**
 * @program: bishe
 * @description: 拦截器
 * @author: liuchen
 **/
@Component
public class LoginHandlerInterceptor extends HandlerInterceptorAdapter {


    /**
     * 记录ip地址和 访问次数
     */
    private AtomicReference<Map<String,Integer>> map = new AtomicReference<>(new HashMap<>());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String contextPath = request.getContextPath();
        String servletPath = request.getServletPath();

        Object user = request.getSession().getAttribute("user");
        Object user1 = request.getSession().getAttribute("user1");






        if("/user/login".equals(servletPath)){
            String addr = request.getRemoteAddr();
            Map<String, Integer> old = null;
            Map<String, Integer> current = current = new HashMap<>();
            do{
                old = map.get();
                Integer integer = old.get(addr);
                if(integer == null){
                    current.put(contextPath,0);
                }else{
                    if(integer < 10){
                        current.put(addr,0+1);
                    }else{
                        response.sendRedirect(contextPath);
                        break;
                    }
                }
            }while( !map.compareAndSet(old,current));

            return true;

        }else {

            if(user == null && user1 == null ){
                //未登陆，返回登陆页面
                request.setAttribute("message","没有权限请先登陆");
                response.sendRedirect(contextPath);
                request.getSession().invalidate();
                return false;
            }else{
                //已登陆，放行请求
                return true;
            }

        }










    }
}
