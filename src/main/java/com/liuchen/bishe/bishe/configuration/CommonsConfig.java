package com.liuchen.bishe.bishe.configuration;

import com.liuchen.bishe.bishe.controller.myInterceptor.LoginHandlerInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @program: bishe
 * @description: 常规的配置类
 * @author: liuchen
 * @create: 2020-02-08 20:35
 **/

@Configuration
public class CommonsConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/toLogin").setViewName("login");
        registry.addViewController("/regiest").setViewName("regiest");

        //首页
        registry.addViewController("/index").setViewName("index/index");

        //客户
        registry.addViewController("/customer").setViewName("customer/customerIndex");
        registry.addViewController("/addCustomer").setViewName("customer/addCustomer");

        //逾期合同列表
        registry.addViewController("/constractxuqi").setViewName("constract/constractInde_xuqi");
        //未到期合同
        registry.addViewController("/constractnoDate").setViewName("constract/constractInde_noDate");
        // 今天到期
        registry.addViewController("/constractnoToday").setViewName("constract/constractInde_today");
        //失效合同
        registry.addViewController("/constractnoshixiao").setViewName("constract/constractInde_shixiao");



        //申请贷款
        registry.addViewController("/loanApplication").setViewName("loanApplication/customerContractApplication");

        //我的贷款申请
        registry.addViewController("/MyLoan").setViewName("my/customerContractIndex");
        registry.addViewController("/myContract").setViewName("my/myContract");



        // 贷款管理 > 审批
        registry.addViewController("/shenpi").setViewName("loanApplication/loanIndex");



        //管理员管理
        registry.addViewController("/adminIndex").setViewName("admin/adminIndex");
        //添加管理员
        registry.addViewController("/addAdmin").setViewName("admin/addAdmin");



        //简介
        registry.addViewController("/aboutMe").setViewName("admin/aboutMe");

        //找回密码
        registry.addViewController("/retirvtePassword").setViewName("retrivevePassword");

    }


    /**
     * 注册 拦截器
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginHandlerInterceptor()).addPathPatterns("/**")
                .excludePathPatterns("/","/regiest","/toLogin","/resource/**","/code","/picture/**","/idPicture/**","/retirvtePassword","/address/**","/user/add","/getRCode","/user/retriveve");
    }
}
