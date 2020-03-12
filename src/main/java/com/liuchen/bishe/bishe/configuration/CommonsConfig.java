package com.liuchen.bishe.bishe.configuration;

import org.springframework.context.annotation.Configuration;
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

        //客户
        registry.addViewController("/customer").setViewName("customer/customerIndex.html");
        registry.addViewController("/addCustomer").setViewName("customer/addCustomer.html");

        //逾期合同列表
        registry.addViewController("/constractxuqi").setViewName("constract/constractInde_xuqi");



        registry.addViewController("/loanApplication").setViewName("loanApplication/customerContractApplication");

        //我的贷款申请
        registry.addViewController("/MyLoan").setViewName("my/customerContractIndex");


        // 贷款管理 > 审批
        registry.addViewController("/shenpi").setViewName("loanApplication/loanIndex");



        //管理员管理
        registry.addViewController("/adminIndex").setViewName("admin/adminIndex");
        //添加管理员
        registry.addViewController("/addAdmin").setViewName("admin/addAdmin");



    }
}
